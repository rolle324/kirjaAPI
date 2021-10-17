"use strict";

let currentPage;
let firstResult;
let lastResult;

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const resultsDiv = document.querySelector("#results");
const searchDiv = document.querySelector("#prevAndNextButtons");

// Event listener for search button
searchButton.addEventListener("click", () => {
    currentPage = 0;
    getBooks(searchInput.value);
})

// Fetch books based on given search term
const getBooks = (search) => {
    fetch("https://openlibrary.org/search.json?q=" + search)
        .then(response => response.json())
        .then(results => printResults(results))
        .catch(error => console.log(error));
}

// Print search results and buttons on page
const printResults = (results) => {
    resultsDiv.innerHTML = ``;
    searchDiv.innerHTML = ``;

    console.log(results);

    let totalPages = Math.ceil(results.docs.length / 12);

    for (let i = currentPage * 12; i < currentPage * 12 + 12; i++) {
        if (results.docs[i] != null) {
            const book = document.createElement("a");
            book.href = "searchDetails.html";
            book.className = "book";

            const cover = document.createElement("img");
            // Use a default cover image if the API doesn't provide one
            if (results.docs[i].cover_i != null) {
                cover.src = "https://covers.openlibrary.org/b/id/" + results.docs[i].cover_i + "-M.jpg";
            } else {
                cover.src = "img/search/book.png";
            }
            cover.alt = "Cover of " + results.docs[i].title;
            cover.style = "width:100%";

            const title = document.createElement("p");
            title.innerText = results.docs[i].title;

            resultsDiv.appendChild(book);
            book.appendChild(cover);
            book.appendChild(title);

            // Event listener that adds information that will be used in searchDetails.js to localStorage
            // Some of these will also be used when the user returns to search.html
            book.addEventListener("click", () => {
                localStorage.setItem("Results", JSON.stringify(results));
                localStorage.setItem("Position", i);
                localStorage.setItem("Page", currentPage);
            })
        }
    }
    const pageCount = document.createElement("p");
    pageCount.innerText = "Page: " + (currentPage + 1) + " / " + totalPages;

    const buttonElements = document.createElement("div");
    buttonElements.className = "buttonElements";

    const previous = document.createElement("button");
    previous.innerText = "Previous";
    previous.className = "previousButton"

    const next = document.createElement("button");
    next.innerText = "Next";
    next.className = "nextButton"

    searchDiv.appendChild(buttonElements);
    buttonElements.appendChild(previous);
    buttonElements.appendChild(next);
    buttonElements.appendChild(pageCount);

    // Event listener that shows the previous 12 books
    previous.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            printResults(results);
        }
    })

    // Event listener that shows the next 12 books
    next.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            printResults(results);
        }
    })
}

// Print last results when returning to page
if (localStorage.getItem("Results") != null) {
    currentPage = parseInt(localStorage.getItem("Page"));
    printResults(JSON.parse(localStorage.getItem("Results")));
}