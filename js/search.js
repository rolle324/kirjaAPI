"use strict";

let firstResult;
let lastResult;

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const resultsDiv = document.querySelector("#results");


// Event listener for search button
searchButton.addEventListener("click", () => {
    firstResult = 0;
    lastResult = 12;
    getBooks(searchInput.value);
})

// Fetch books based on given search term (does not include description and links)
const getBooks = (search) => {
    fetch("http://openlibrary.org/search.json?q=" + search)
        .then(response => response.json())
        .then(results => printResults(results))
        .catch(error => console.log(error));
}

// Print search results and buttons on page
const printResults = (results) => {
    resultsDiv.innerHTML = ``;
    console.log(results);

    for (let i = firstResult; i < lastResult; i++) {
        if (results.docs[i] != null) {
            const book = document.createElement("div");
            book.className = "book";

            const cover = document.createElement("img");
            // Use a default cover image if the API doesn't provide one
            if (results.docs[i].cover_i != null) {
                cover.src = "http://covers.openlibrary.org/b/id/" + results.docs[i].cover_i + "-M.jpg";
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

            // Event listener that adds the book's details to localStorage and moves to the searchDetails page
            book.addEventListener("click", () => {
                localStorage.setItem("Key", results.docs[i].key);

                if (results.docs[i].author_name != null) {
                    localStorage.setItem("Author", results.docs[i].author_name[0]);
                } else {
                    localStorage.setItem("Author", "Author unknown");
                }

                if (results.docs[i].first_publish_year != null) {
                    localStorage.setItem("Published", results.docs[i].first_publish_year);
                } else {
                    localStorage.setItem("Published", "Publishing year unknown");
                }

                window.location.href = "searchDetails.html";
            })
        }
    }

    const buttonElements = document.createElement("div");
    buttonElements.className = "buttonElements";

    const previous = document.createElement("button");
    previous.innerText = "Previous";

    const next = document.createElement("button");
    next.innerText = "Next";

    buttonElements.appendChild(previous);
    buttonElements.appendChild(next);
    resultsDiv.appendChild(buttonElements);

    // Event listener that shows the previous 10 books
    previous.addEventListener("click", () => {
        if (firstResult >= 12) {
            firstResult -= 12;
            lastResult -= 12;
            printResults(results);
        }
    })

    // Event listener that shows the next 10 books
    next.addEventListener("click", () => {
        if (lastResult <= results.docs.length) {
            firstResult += 12;
            lastResult += 12;
            printResults(results);
        }
    })
}