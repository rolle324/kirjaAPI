const doc = document;


//Searches css elements
const menuOpen = doc.querySelector(".menu");
const menuClose = doc.querySelector(".close");
const overlay = doc.querySelector(".overlay");

//When you click menu button overlay is active
menuOpen.addEventListener("click", () => {
    overlay.classList.add("overlay--active");
});

//When you click X button overlay is not active
menuClose.addEventListener("click", () => {
    overlay.classList.remove("overlay--active");
});