async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;

  if (!amount || amount <= 0) {
    alert("Please enter the correct amount.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
    );
    const data = await response.json();
    const rate = data.rates[0].mid;
    const result = (amount * rate).toFixed(2);

    document.getElementById("result").innerText = `Amount in PLN: ${result}`;
  } catch (error) {
    alert("Error while receiving data. Please try again later.");
    console.error(error);
  }
}
