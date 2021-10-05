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
    const book = document.createElement("img");
    book.src = "http://covers.openlibrary.org/b/id/" + results.docs[i].cover_i + "-M.jpg";
    resultsDiv.appendChild(book);

    book.addEventListener("click", () => {
      console.log(i);
      const detailString = JSON.stringify(results.docs);
      localStorage.setItem("Details", detailString);
      window.location.href = "searchDetails.html";
    })
  }
}