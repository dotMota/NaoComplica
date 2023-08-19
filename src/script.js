// Função para ativar o script quando um rádio for clicado
function activateScriptOnRadioClick() {
    console.log("Script ativado!");

    // Esperar que todos os elementos da página sejam carregados
    document.addEventListener("DOMContentLoaded", function() {
        var radioButtons = document.querySelectorAll("input[type='radio']");
        var labels = document.querySelectorAll("label");

        radioButtons.forEach(function(radioButton, index) {
            radioButton.addEventListener("click", function() {
                console.log("Botão de rádio clicado:", index);

                labels.forEach(function(label) {
                    label.classList.remove("checked");
                });

                labels[index].classList.add("checked");
            });
        });
    });
}

// Ativar o script quando a página carregar
document.addEventListener("DOMContentLoaded", activateScriptOnRadioClick);
