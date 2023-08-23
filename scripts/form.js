const openButtonForm = document.querySelector(".btn--tablets")
const modalForm = document.querySelector(".modal__form");
const content = document.querySelector(".modal__content");
const modalFormNone = document.querySelector(".modal__form__none");
const closeButtonForm = document.querySelector('.app-close-modal');
const closeButtonFormNone = document.querySelector('.app-close-modal--none');
const form = document.querySelector(".form");



const validateField = (field) => {
    if (!field.value.trim().length) {
        field.classList.add("form__input_error")
        return false
    }   else {
        field.classList.remove("form__input_error")
        return true
    }
}

const validateForm = (data) => {
    let isValid = true
    for (const key in data) {
        const element = data[key];
        const valid = validateField(element)
    console.log(element.value);
        if (!valid) {
            isValid = false
        }
    }
    return isValid
   
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
            name: form.elements.name.value,
            phone: form.elements.phone.value,
            comment: form.elements.comment.value,
            to: form.elements.to.value,
            },
        success: (data) => {
           
                modalForm.classList.add("modal__form__opened")
            },
        error: (data) => {
            
            modalFormNone.classList.add("modal__form__opened") 
        
        }
        
    });
    const data = {
        name: form.elements.name, 
        phone: form.elements.phone, 
        comment: form.elements.comment, 
        to: form.elements.to,
    }
  

    if (validateForm(data)) {
        //modalForm.classList.add("modal__form__opened")
    } else {
            //modalFormNone.classList.add("modal__form__opened")        
    }
});

closeButtonForm.addEventListener('click', (e) => {
 e.preventDefault();
 modalForm.classList.remove("modal__form__opened")
 
})
closeButtonFormNone.addEventListener('click', (e) => {
    e.preventDefault();
    modalFormNone.classList.remove("modal__form__opened")
})