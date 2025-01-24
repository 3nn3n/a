const button = document.getElementById("fetch");
const resultDiv = document.getElementById("result");
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your Alpha Vantage API Key

button.addEventListener("click", async () => {
    const symbol = document.getElementById("symbol").value.trim().toUpperCase();
    if (!symbol) {
        resultDiv.innerHTML = '<p class="error">Please enter a valid stock symbol.</p>';
        return;
    }

    fetchStockPrice(symbol);
});

async function fetchStockPrice(symbol) {
    try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data["Global Quote"];

        if (!data || Object.keys(data).length === 0) {
            resultDiv.innerHTML = '<p class="error">No data found for this stock symbol. Please try again.</p>';
            return;
        }

        const stockHTML = `
            <h3>${symbol}</h3>
            <p><strong>Current Price:</strong> $${data["05. price"]}</p>
            <p><strong>Open:</strong> $${data["02. open"]}</p>
            <p><strong>High:</strong> $${data["03. high"]}</p>
            <p><strong>Low:</strong> $${data["04. low"]}</p>
        `;
        resultDiv.innerHTML = stockHTML;

        // Auto-refresh every 1 minute
        setTimeout(() => fetchStockPrice(symbol), 60000);
    } catch (error) {
        console.error("Error fetching stock price:", error);
        resultDiv.innerHTML = '<p class="error">Failed to fetch stock data. Please try again later.</p>';
    }
}