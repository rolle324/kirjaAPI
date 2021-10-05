"use strict";

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const resultsDiv = document.querySelector("#results");

// Event listener for search button
searchButton.addEventListener("click", () => {
  resultsDiv.innerHTML = ``;
  getBooks(searchInput.value);
})

// Fetch books based on given search term
const getBooks = (search) => {
  fetch("http://openlibrary.org/search.json?q=" + search)
  .then(response => response.json())
  .then(results => printResults(results))
  .catch(error => console.log(error));
}

// Print search results on page
const printResults = (results) => {
  console.log(results);
  
  for (let i = 0; i <= 10; i++) {
    const book = document.createElement("div");
    book.className = "book";

    const cover = document.createElement("img");
    cover.src = "http://covers.openlibrary.org/b/id/" + results.docs[i].cover_i + "-M.jpg";

    const title = document.createElement("p");
    title.innerText = results.docs[i].title;

    resultsDiv.appendChild(book);
    book.appendChild(cover);
    book.appendChild(title);

    book.addEventListener("click", () => {
      const detailsString = JSON.stringify(results.docs[i]);
      localStorage.setItem("Details", detailsString);
      window.location.href = "searchDetails.html";
    })
  }
}