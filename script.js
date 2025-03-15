const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");
const description = document.querySelector("#description");
const result = document.querySelector("#result");
//Cotação das moedas
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

amount.addEventListener("input", () => {
  const hasCharacteresRegex = /\D+/g;
 // console.log(amount.value);
  amount.value = amount.value.replace(hasCharacteresRegex, "");
});

form.onsubmit = (e) => {
  e.preventDefault();

  //console.log(currency.value);
  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

//funcao para converter o valor
function convertCurrency(amount, price, symbol) {
  // console.log(amount, price, symbol);
  try {
    //Exibe a cotação da moeda
    description.textContent = `${symbol} 1 = R$ ${formatCurrencyBRL(price)}`;
    //Adiciona a classe show-result ao footer

    let total = amount * price;
    if (isNaN(total)) {
       return alert("Por favor, digite um valor válido");
    }
    total = formatCurrencyBRL(total).replace("R$", "");
    //Exibe o valor convertido
    result.textContent = `${total} Reais`;
    footer.classList.add("show-result");  
} catch (error) {
  console.log(error);
  //Remove a classe show-result do footer
  footer.classList.remove("show-result");  
  alert("Erro ao converter moeda");
  } 
}

//Formata o valor para o padrão brasileiro
function formatCurrencyBRL(value) {
    //Converte para numero para utilizar o toLocaleString para formatar no padrão brasileiro BRL (R$ 00,00)
      return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })   
}
