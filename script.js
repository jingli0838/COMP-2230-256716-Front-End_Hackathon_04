const formNode = document.getElementById("questionare");

const userNameNode = formNode.elements["userName"];
const emailInputNode = formNode.elements["userEmail"];


const inputGroupNameNode = document.querySelector(".input-group-name");
const inputGroupEmailNode = document.querySelector(".input-group-email");
const inputGroupFruitNode = document.querySelector(".input-group-fruit");
const inputGroupVegetable = document.querySelector(".input-group-vegetable");
const endNode = document.querySelector(".end");

let nameErrorMessage = "";
let emailErrorMessage = "";
let fruitErrorMessage = "";
let vegetableErrorMessage = "";

formNode.addEventListener("submit",(event) => {

    event.preventDefault();
    // remove all the exsiting error message
    document.querySelectorAll(".error-message").forEach((errorM) => errorM.remove());

    // validate all the inputs
    if(!validateUserName()){
        showInputError(inputGroupNameNode, nameErrorMessage);
    }

    if(!validateUserEmail()){
        showInputError(inputGroupEmailNode, emailErrorMessage);
    }

    if(!validateRadioFruit()){
        showInputError(inputGroupFruitNode, fruitErrorMessage);
    }

    if(!validateRadioVegetable()){
        showInputError(inputGroupVegetable,vegetableErrorMessage)};

    if(validateUserName() && validateUserEmail() && validateRadioFruit() && validateRadioVegetable()){
        endNode.style.display = "flex";
        formNode.style.display = "none";
    }

    // Validate all checkbox input
    validateCheckboxDrink();

    validateCheckboxMeal();
    

});



// show error message function
function showInputError(inputElement, message){
    // create new element 'p'
    const newErrorMessageNode = document.createElement("p");
    newErrorMessageNode.className = "error-message";

    // set element role to "alert" for reader
    newErrorMessageNode.setAttribute("role", "alert");

    // add new error message
    newErrorMessageNode.innerText = message;
    inputElement.appendChild(newErrorMessageNode);
}


// validate user name
function validateUserName(){
    const userName = escapeHTML(userNameNode.value);
    // user name pattern
    const userNamePattern = /^[a-zA-Z ]+$/;

    if(userName.length == 0){
        nameErrorMessage = "User Name is required" ;
        return false;
    }else if(!userNamePattern.test(userName)){
        nameErrorMessage = "User Name is invalide";
        return false;
    }else if(userName.length >40){
        nameErrorMessage = "Username should be less than 40 char"
        return false;
    }
    return true; 
}


// validate user email
function validateUserEmail(){
    
    // email pattern
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // check email
    if(emailInputNode.value.length === 0){
        emailErrorMessage = "Email is required";
        return false;
    }else if(!emailPattern.test(emailInputNode.value)){
        emailErrorMessage = "Email is invalid";
        return false;
    }
    return true;
}

function validateRadioVegetable(){
    const allVegetableRadioes = document.querySelectorAll('input[name = "vegetable"]');
    for(let i=0; i<allVegetableRadioes.length; i++){
        if(allVegetableRadioes[i].checked){
            return true;
        }
    }
    vegetableErrorMessage = "please choose your favorite vegetable";
    return false;
  
}


function validateRadioFruit(){
    const allFruitRadioes = document.querySelectorAll('input[name = "fruit"]');
    for(let i=0; i<allFruitRadioes.length; i++){
        if(allFruitRadioes[i].checked){
            return true;
        }
    }
    fruitErrorMessage = "please choose your favorite vegetable";
    return false;

}

// Validator for question 3 & 4
function validateCheckboxDrink() {
    const checkedAnswer = document.querySelectorAll('input[name="drink"]:checked');
    if (checkedAnswer.length !== 3) {
        const errorMessage = document.getElementById('drink-error');
        errorMessage.textContent = 'Please select exactly 3 options.';
        errorMessage.className = 'error-message';
        errorMessage.setAttribute("role", "alert");
    };
};

function validateCheckboxMeal() {
    const checkedAnswer = document.querySelectorAll('input[name="meal"]:checked');
    if (checkedAnswer.length !== 3) {
        const errorMessage = document.getElementById('meal-error');
        errorMessage.textContent = 'Please select exactly 3 options.';
        errorMessage.className = 'error-message';
        errorMessage.setAttribute("role", "alert");
    };
};




function escapeHTML(input) {
    // g flag tests against all possible matches 

    // "<div>" will be read as &lt;div&gt; 
    // html interpreter will not interpret these strings as markup-- it will just display them on the page using the corresponding code
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// click home button then back to the form
document.querySelector("#homeButton").onclick = (() => {
    location.href = "index.html";
});
