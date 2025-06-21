// ✅ Global styling for dark theme
document.body.style.backgroundColor = "#121212";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.color = "white";

// ✅ Button styling
let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.style.backgroundColor = "#212020cf";
    button.style.padding = '15px';
    button.style.width = "22vw";
    button.style.border = '2px solid white';
    button.style.color = 'white';
    button.style.cursor = "pointer";
    button.style.borderRadius = "4px"; // ✅ subtle polish
});

// ✅ Input styling
let searchBar = document.getElementById("searchInput");
searchBar.style.backgroundColor = "#212020cf";
searchBar.style.width = "55vw";
searchBar.style.padding = "15px";
searchBar.style.border = "2px solid white";
searchBar.style.color = "lightgrey";

// ✅ Container layout styling
let container = document.getElementsByClassName("container")[0];
let div = document.getElementsByClassName("div")[0];

// div.style.backgroundColor = "#212020cf";
div.style.height = "100vh";
div.style.padding = "20px";
container.style.display = "flex";
container.style.justifyContent = "space-between";
// container.style.flexWrap = "wrap";
container.style.gap = "10px";

let tableBody;
let originalData = []; // ✅ Needed for re-sorting/filtering

// ✅ Fetch data (no caching)
const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&_=${Date.now()}`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        originalData = data;
        tableBody = document.querySelector('.table-body');
        renderTable(data); // ✅ first load


         const table = document.querySelector("table");
        table.style.borderSpacing = "0 20px"; 
         table.style.fontSize = "20px";
         

    });

// ✅ Render data dynamically
function renderTable(data) {
    tableBody.innerHTML = ''; // clear previous

    data.forEach(coin => {
        let row = document.createElement('tr');
        // row.style.borderBottom = "1px solid #333";
        // row.style.padding = "10px";

        // 🪙 Coin with image
        let nameCell = document.createElement("td");
        let img = document.createElement("img");
        img.src = coin.image;
        img.style.width = "24px";
        img.style.marginRight = "10px";
        img.style.verticalAlign = "middle";

        let nameText = document.createTextNode(coin.name);
        nameCell.appendChild(img);
        nameCell.appendChild(nameText);

        // 🔠 Symbol
        let symbolCell = document.createElement("td");
        symbolCell.textContent = coin.symbol.toUpperCase();

        // 💰 Price
        let priceCell = document.createElement("td");
        priceCell.textContent = `$${coin.current_price.toLocaleString()}`;

        // 🏦 Market Cap
        let marketCapCell = document.createElement("td");
        marketCapCell.textContent = `$${coin.market_cap.toLocaleString()}`;

        // 📈 24h Change %
        let changeCell = document.createElement("td");
        let change = coin.price_change_percentage_24h;
        changeCell.textContent = `${change.toFixed(2)}%`;
        changeCell.style.color = change >= 0 ? "lightgreen" : "red";

        // Append all <td>s
        row.appendChild(nameCell);
        row.appendChild(symbolCell);
        row.appendChild(priceCell);
        row.appendChild(marketCapCell);
        row.appendChild(changeCell);

        tableBody.appendChild(row);
    });
}

// ✅ Search functionality
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filtered = originalData.filter(coin =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
    renderTable(filtered);
});

// ✅ Sort buttons by ID (corrected IDs used)
let sortMarketCapBtn = document.getElementById("sortByMarketCap");
let sortChangeBtn = document.getElementById("sortByChange");

sortMarketCapBtn.addEventListener("click", () => {
    let sorted = [...originalData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sorted);
});

sortChangeBtn.addEventListener("click", () => {
    let sorted = [...originalData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sorted);
});
