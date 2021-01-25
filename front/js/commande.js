let clearButton = document.getElementById("clearLocalStorage");
let continueButton = document.getElementById("continueButton");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("adress");
let city = document.getElementById("city");
let email = document.getElementById("mail");

let commandNumber = document.getElementById("commandNumber");
let contact = document.getElementById("contact");
let totalPrice = document.getElementById("totalPrice");
let calculatePrice = 0;
let productListContainer = document.getElementById("productListContainer");

let firstNameText = localStorage.getItem("firstName");
let lastNameText = localStorage.getItem("lastName");
let addressText = localStorage.getItem("address");
let cityText = localStorage.getItem("city");
let emailText = localStorage.getItem("email");
let orderId = localStorage.getItem("orderId");

let totalQty = document.getElementById("totalQty");

commandNumber.innerHTML = orderId;
firstName.innerHTML = firstNameText;
lastName.innerHTML = lastNameText;
address.innerHTML = addressText;
city.innerHTML = cityText;
email.innerHTML = emailText;

let panier = [];

if(localStorage.length == 0){

    localStorage.setItem("panier", JSON.stringify(panier));

};

fetch("http://localhost:3000/api/teddies").then(response => response.json())
.then(function(response){

    displayCommandItems(response);

    displayTotalQty();

})

function displayCommandItems(teddy){

    if(localStorage.length > 0){

        let panier = JSON.parse(localStorage.getItem("panier"));

        if(panier.length > 0){

            for(i in panier){

                let item = panier[i];

                let teddyId = item[0];
                let teddyOption = item[1];
                let teddyQty = item[2];

                fetch("http://localhost:3000/api/teddies/" + teddyId).then(response => response.json())
                .then(function(teddy){

                    let item = document.createElement("li");
                    item.classList.add("text-center", "rounded", "p-2", "mt-4", "bg-dark");
                    productListContainer.appendChild(item);

                    let teddyImg = document.createElement("img");
                    teddyImg.classList.add("img-fluid", "pt-2");
                    teddyImg.style.maxHeight = "200px";
                    teddyImg.src = teddy.imageUrl;
                    item.appendChild(teddyImg);

                    let productText = document.createElement("h2");
                    productText.classList.add("text-center", "text-primary");
                    productText.innerHTML = "Produit";
                    item.appendChild(productText);

                    let teddyName = document.createElement("h2");
                    teddyName.classList.add("text-center", "text-light");
                    teddyName.innerHTML = teddy.name;
                    item.appendChild(teddyName);

                    let optText = document.createElement("h2");
                    optText.classList.add("text-center", "text-primary");
                    optText.innerHTML = "Option";
                    item.appendChild(optText);

                    let teddyColor = document.createElement("h2");
                    teddyColor.classList.add("text-center", "text-light");
                    teddyColor.innerHTML = teddy.colors[teddyOption];
                    item.appendChild(teddyColor);

                    let qtyText = document.createElement("h2");
                    qtyText.classList.add("text-center", "text-primary");
                    qtyText.innerHTML = "Quantité";
                    item.appendChild(qtyText);

                    let qtyStr = document.createElement("h2");
                    qtyStr.classList.add("text-center", "text-light");
                    qtyStr.innerHTML = teddyQty;
                    item.appendChild(qtyStr);

                    let priceText = document.createElement("h2");
                    priceText.classList.add("text-center", "text-primary");
                    priceText.innerHTML = "Prix";
                    item.appendChild(priceText);

                    let teddyPrice = document.createElement("h2");
                    teddyPrice.classList.add("text-center", "text-light");
                    teddyPrice.innerHTML = teddy.price + "€";
                    item.appendChild(teddyPrice);

                })

                displayTotalPrice(teddyId, teddyQty);

            }

        }else{

            console.log("Test failed");

        };
    
    }

};

function displayTotalPrice(id, qty) {

    fetch("http://localhost:3000/api/teddies/" + id).then(response => response.json())
    .then(function (response){

        let teddyPrice = response.price;

        parseInt(teddyPrice);

        calculatePrice += teddyPrice * qty;

        totalPrice.innerHTML = calculatePrice + "€";

    })
    .catch(function (response){

        console.log(response);

    });

};

continueButton.addEventListener("click", function(event){

    event.preventDefault;

    localStorage.clear();

    window.location.href = "/index.html";

});

clearButton.addEventListener("click", function(event){

    localStorage.clear();

});

function displayTotalQty(){

    let qty = 0;

    if(localStorage.length > 0){

        let panier = JSON.parse(localStorage.getItem("panier"));

        if(panier.length > 0){

            qty = panier.length;

            for(i in panier){

                let item = panier[i];

                let qtyPerItems = item[2];

                parseInt(qty);

                qty += qtyPerItems - 1; 

            }

            totalQty.innerHTML = qty;

        }

    }else{

        totalQty.innerHTML = qty;

    }

};