let detailsString = localStorage.getItem("Details");
let details = JSON.parse(detailsString);
console.log(details);

const detailsDiv = document.querySelector("#searchDetails");

const cover = document.createElement("img");
cover.src = "http://covers.openlibrary.org/b/id/" + details.cover_i + "-M.jpg";

const title = document.createElement("h1");
title.innerText = details.title;

const author = document.createElement("h2");
author.innerText = details.author_name[0];

const publishDate = document.createElement("p");
publishDate.innerText = "Published: " + details.first_publish_year;

const goodreads = document.createElement("a");
goodreads.href = "https://www.goodreads.com/book/show/" + details.id_goodreads[0];
goodreads.innerText = details.title + " at Goodreads";

detailsDiv.appendChild(cover);
detailsDiv.appendChild(title);
detailsDiv.appendChild(author);
detailsDiv.appendChild(publishDate);
detailsDiv.appendChild(goodreads);