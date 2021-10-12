"use strict";

const results = JSON.parse(localStorage.getItem("Results"));
const position = localStorage.getItem("Position");

const detailsDiv = document.querySelector("#searchDetails");

// Fetch book details based on it's key
fetch("https://openlibrary.org" + results.docs[position].key + ".json")
  .then(response => response.json())
  .then(details => printDetails(details))
  .catch(error => console.log(error));

// Print book details on page
const printDetails = (details) => {
  console.log(details);

  const cover = document.createElement("img");

  if (details.covers != null) {
    cover.src = "https://covers.openlibrary.org/b/id/" + details.covers[0] + "-M.jpg";
  } else {
    cover.src = "img/search/book.png";
  }

  const title = document.createElement("p");
  title.innerText = details.title;

  const author = document.createElement("p");
  if (results.docs[position].author_name[0] != null) {
    author.innerText = results.docs[position].author_name[0];
  } else {
    author.innerText = "Author unknown";
  }
  
  const published = document.createElement("p");
  if (results.docs[position].first_publish_year != null) {
    published.innerText = results.docs[position].first_publish_year;
  } else {
    published.innerText = "Publishing year unknown";
  }

  const description = document.createElement("p");
  if (typeof(details.description) == "string") {
    description.innerText = details.description;
  } else if (typeof(details.description) == "object") {
    description.innerText = details.description.value.toString();
  }

  detailsDiv.appendChild(cover);
  detailsDiv.appendChild(title);
  detailsDiv.appendChild(author);
  detailsDiv.appendChild(published);
  detailsDiv.appendChild(description);

  // Add all links to an unordered list
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