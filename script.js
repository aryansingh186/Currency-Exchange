// Elements
const amount1 = document.getElementById("amount1");
const amount2 = document.getElementById("amount2");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const  iconImg = document.getElementById("iconImg");

// API URL
const apiURL = "https://api.exchangerate-api.com/v4/latest/";

// Function to convert
async function convertCurrency() {
  let from = fromCurrency.value;
  let to = toCurrency.value;
  let amount = amount1.value;

  if (amount === "" || amount <= 0) {
    amount2.value = "";
    return;
  }

  try {
    // Axios call
    const response = await axios.get(`${apiURL}${from}`);
    const data = response.data;

    let rate = data.rates[to];
    amount2.value = (amount * rate).toFixed(2);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}
// Swap currencies when clicking the icon
iconImg.addEventListener("click", (e) => {
  e.preventDefault(); // stop page reload since <a href="#">
  
  // Swap dropdown values
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // Recalculate conversion
  convertCurrency();
});

// Event listeners
amount1.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);
