const openButton = document.querySelector(".hamburger");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector('.modal__close');
const body = document.querySelector("body");

openButton.addEventListener('click', () => {
    modal.classList.add("modal__opened")
    body.classList.add("body__closed")
})

closeButton.addEventListener('click', () => {
 
  modal.classList.remove("modal__opened")
  body.classList.remove("body__closed")

})

