"use strict";

const results = JSON.parse(localStorage.getItem("Results"));
const position = localStorage.getItem("Position");

const detailsDiv = document.querySelector("#searchDetails");
const gridContainer = document.querySelector("#grid-container");


// Fetch book details based on it's key
fetch("https://openlibrary.org" + results.docs[position].key + ".json")
    .then(response => response.json())
    .then(details => printDetails(details))
    .catch(error => console.log(error));

// Print book details on page
const printDetails = (details) => {
    console.log(details);

    // masan säätöö

    const gridItem1 = document.createElement('div');
    gridItem1.setAttribute('class', 'grid-item1');
    const gridItem2 = document.createElement('div');
    gridItem2.setAttribute('class', 'grid-item2');
    const gridItem3 = document.createElement('div');
    gridItem3.setAttribute('class', 'grid-item3');

    //loppuu

    const cover = document.createElement("img");
    cover.setAttribute('class', 'book-cover');

    if (details.covers != null) {
        cover.src = "https://covers.openlibrary.org/b/id/" + details.covers[0] + "-M.jpg";
    } else {
        cover.src = "img/search/book.png";
    }

    const title = document.createElement("p");
    title.innerText = details.title;
    title.setAttribute('class', 'book-title')

    const author = document.createElement("p");
    author.setAttribute('class', 'book-author');
    if (results.docs[position].author_name[0] != null) {
        author.innerText = "Author: " + results.docs[position].author_name[0];
    } else {
        author.innerText = "Author unknown";
    }

    const published = document.createElement("p");
    published.setAttribute('class', 'book-published');
    if (results.docs[position].first_publish_year != null) {
        published.innerText = "Publishing year: " + results.docs[position].first_publish_year;
    } else {
        published.innerText = "Publishing year unknown";
    }

    const description = document.createElement("p");
    description.setAttribute('class', 'description');
    if (typeof (details.description) == "string") {
        description.innerText = details.description;
    } else if (typeof (details.description) == "object") {
        description.innerText = details.description.value.toString();

    }  else {
        description.setAttribute('class', 'no-data');
        description.innerText = "No description found";
    }

    detailsDiv.appendChild(gridContainer);
    gridContainer.appendChild(gridItem1);
    gridContainer.appendChild(gridItem2);
    gridContainer.appendChild(gridItem3);

    gridItem1.appendChild(cover);
    gridItem1.appendChild(title);
    gridItem1.appendChild(author);
    gridItem1.appendChild(published);

    gridItem2.appendChild(description);

    // Add all links to an unordered list
    if (details.links != null) {
        gridItem3.innerHTML += `<p class="book-links">Links:</p>`
        const list = document.createElement("ul");
        list.setAttribute('class', 'book-link-list')
        gridItem3.appendChild(list);

        for (let i = 0; i < details.links.length; i++) {
            const listItem = document.createElement("li");
            listItem.setAttribute('class', 'book-list-link' + [i]);

            const link = document.createElement("a");
            link.href = details.links[i].url;
            link.innerText = details.links[i].title;

            list.appendChild(listItem);
            listItem.appendChild(link);
        }
    } else {
        const linkNull = document.createElement('p');
        linkNull.setAttribute('class', 'no-data');
        linkNull.innerText = "No links found";
        gridItem3.appendChild(linkNull);
        console.log(linkNull);
    }
}