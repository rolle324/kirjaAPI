"use strict";

// Reads the book's details from localStorage
let key = localStorage.getItem("Key");
let authorName = localStorage.getItem("Author");
let publishYear = localStorage.getItem("Published");

const detailsDiv = document.querySelector("#searchDetails");

fetch("https://openlibrary.org" + key + ".json")
  .then(response => response.json())
  .then(details => printDetails(details))
  .catch(error => console.log(error));

// Print book details on page
const printDetails = (details) => {
  console.log(details);

  const cover = document.createElement("img");
  cover.src = "http://covers.openlibrary.org/b/id/" + details.covers[0] + "-M.jpg";

  const author = document.createElement("p");
  author.innerText = authorName;

  const published = document.createElement("p");
  published.innerText = publishYear;

  const description = document.createElement("p");
  if (typeof(details.description) == "string") {
    description.innerText = details.description;
  } else if (typeof(details.description) == "object") {
    description.innerText = details.description.value.toString();
    console.log(typeof(description.innerText));
  }

  detailsDiv.appendChild(cover);
  detailsDiv.appendChild(author);
  detailsDiv.appendChild(published);
  detailsDiv.appendChild(description);

  if (details.links != null) {
    detailsDiv.innerHTML += `<p>Links:</p>`
    const list = document.createElement("ul");
    detailsDiv.appendChild(list);

    for (let i = 0; i < details.links.length; i++) {
      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.href = details.links[i].url;
      link.innerText = details.links[i].title;

      list.appendChild(listItem);
      listItem.appendChild(link);
    }
  }
}