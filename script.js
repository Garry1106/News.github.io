const API_KEY = "319f6625c4de4d569b0edc94d88f1592";
const API_URL = "https://newsapi.org/v2/everything?q=";

// On window load , fetchNews will be called
window.addEventListener('load', () => {
    fetchNews("India");
});

// Asynchronous function to fetch api data
// FetchNews will return promise
async function fetchNews(query) {
    const response = await fetch(`${API_URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
};
function bindData(articles) {
    const cardContain = document.getElementById("card-container");
    const cardTemp = document.getElementById("template-card");

    // For every api call the inner html will be empty just to not print same number of artciles each time
    cardContain.innerHTML = "";

    // For loop to traverse through the articles

    articles.forEach((article)=> {

        if (!article.urlToImage) {
            return;
        };
        // cloneNode() will clone each and every node present in the target node if the value is true , else it will copy the target node only
        const cardClone = cardTemp.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContain.appendChild(cardClone);
    });

    // function to Fill api data into the card
    function fillDataInCard(cardClone, article) {
        // console.log(article)

        const newsImg = cardClone.querySelector("#news-img");
        const newsTitle = cardClone.querySelector("#news-title");
        const newsSource = cardClone.querySelector("#news-source");
        const newsDesc = cardClone.querySelector("#news-desc");

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;
        const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone : "Asia/Jakarta"
        });
        const sr = article.source.name;
        newsSource.innerHTML =  `${article.source.name} . ${date}`;

        cardClone.firstElementChild.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        });

    };
};
let currSelected = null;
function onNav(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelected?.classList.remove("active");
    currSelected = navItem;
    navItem.classList.add("active")
};
const searchBtn = document.getElementById("search-btn");
const inputSearch = document.getElementById("search-txt")

searchBtn.addEventListener("click",()=>{
    const query = inputSearch.value;
    if(!query)
    {
        return;
    }
    fetchNews(query);
    currSelected?.classList.remove("active");
    currSelected = null;
});

function logout()
{
    window.location.href = "index.html";
}