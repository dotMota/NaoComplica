// Função para ser executada quando o novo botão for clicado
function handleShowQuestionsAndAlternativesClick() {
     console.log("Botão ShowQuestionsAndAlternatives!")
    // Limpar as alternativas anteriores
    const outputAlternatives = document.getElementById("outputAlternatives");
    outputAlternatives.innerHTML = '';

    // Enviar mensagem para o conteúdo da guia ativa
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        
        // Enviar mensagem para o conteúdo da guia ativa
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: sendContentMessage
        });
    });
}

// Função para enviar mensagem para o conteúdo da guia ativa
function sendContentMessage() {
    // Extrair a pergunta
    const questionNumberElement = document.querySelector('.question__description__index');
    const questionTextElement = document.querySelector('.question__description__text');
    const alternativesElements = document.querySelectorAll('.question__alternative');

    const questionNumber = questionNumberElement ? questionNumberElement.textContent.trim() : 'Número da pergunta não encontrado';
    const questionText = questionTextElement ? questionTextElement.textContent.trim() : 'Pergunta não encontrada';

    let alternatives = [];
    alternativesElements.forEach((element, index) => {
        const alternativeText = element.querySelector('.article-text').textContent.trim();
        alternatives.push(alternativeText);
    });

    // Enviar resposta de volta para o popup
    chrome.runtime.sendMessage({
        questionNumber: questionNumber,
        questionText: questionText,
        alternatives: alternatives
    });
}

// Função para manipular a mensagem recebida do background script
function handleContentMessage(response) {
    const outputQuestionNumber = document.getElementById("outputQuestionNumber");
    const outputQuestionText = document.getElementById("outputQuestionText");
    const outputAlternatives = document.getElementById("outputAlternatives");

    // Exibir o número da pergunta e a pergunta
    outputQuestionNumber.textContent = response.questionNumber;
    outputQuestionText.textContent = response.questionText;


    let alternativesHtml = '';
    let alternativesText = '';
    
    response.alternatives.forEach((alternative, index) => {
        alternativesHtml += `
            <label>
                <input type="radio" name="alternative" id="activateScriptButton" value="${index}">
                <span>${String.fromCharCode(65 + index)} - ${alternative}</span>
            </label><br>
        `;        
        alternativesText += `${String.fromCharCode(65 + index)} - ${alternative}\n`;
    });
    
    outputAlternatives.innerHTML = alternativesHtml;
    
    // Criar a variável combinedAsk com o conteúdo dos elementos
    const combinedAsk = `${outputQuestionNumber.textContent}. ${outputQuestionText.textContent}\n${alternativesText}`;
    console.log(combinedAsk);
    
    // Copiar para a área de transferência
    const textArea = document.createElement("textarea");
    textArea.value = combinedAsk;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

}
// Associar a função ao evento de clique do novo botão
document.getElementById("ShowQuestionsAndAlternatives").addEventListener("click", handleShowQuestionsAndAlternativesClick);

// Escutar mensagens do background script (conteúdo da guia ativa)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Manipular mensagens recebidas do conteúdo da guia ativa
    if (request.questionNumber && request.questionText && request.alternatives) {
        handleContentMessage(request);
    }
});
