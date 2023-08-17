/* ConnectionOpenAI.js

// Defina a chave de API uma vez
const apiKey = ''; // Substitua pela sua chave de API

// Função para testar a conexão com a API da OpenAI
async function testApiConnection() {
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'; // URL da API

    const requestData = {
        prompt: "Testando a conexão com a API da OpenAI.",
        max_tokens: 5 // Número de tokens na resposta
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestData)
    };

    try {
        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            const testResponse = data.choices[0].text.trim();
            console.log('Resposta do teste de conexão:', testResponse);
        } else {
            console.error('Resposta da API inválida:', data);
        }
    } catch (error) {
        console.error('Erro ao testar a conexão com a API:', error);
    }
}
testApiConnection();

Fim conexão API */