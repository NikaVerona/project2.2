document
  .getElementById("converter-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const amount = event.target.amount.value;
    const currency = event.target.currency.value;

    document.getElementById("result").innerText = "Amount in PLN: -";
    document.getElementById("error-message").innerText = "";

    if (!amount || amount <= 0) {
      document.getElementById("error-message").innerText =
        "Please enter a correct amount.";
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
      document.getElementById("error-message").innerText =
        "Error while receiving data. Please try again later.";
      console.error(error);
    }
  });
