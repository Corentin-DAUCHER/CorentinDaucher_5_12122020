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

fetch("http://localhost:3000/api/teddies").then(response => response.json())
.then(function(response){

    displayCommandItems(response);

    displayTotalPrice();

    displayTotalQty();

})

function displayCommandItems(teddy){

    for(key in localStorage){

        if(!localStorage.hasOwnProperty(key)){

            continue;

        };

        if(key != "firstName" && key != "lastName"  && key != "address" && key != "city" && key != "email"){

            let value = JSON.parse(localStorage.getItem(key));

            let teddyId = value[0];
            let teddyOption = value[1];
            let teddyQty = value[2];

            console.log(teddyId, teddyOption, teddyQty);

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

        }else{

            console.log("Test failed");

        };
    
    }

};

function displayTotalPrice(){

    for(key in localStorage){

        if(!localStorage.hasOwnProperty(key)){

            continue;

        };

        if(key != "firstName" && key != "lastName"  && key != "address" && key != "city" && key != "email"){

            if(!localStorage.hasOwnProperty(key)){

                continue;
    
            };

            let value = JSON.parse(localStorage.getItem(key));

            let teddyId = value[0];

            console.log(teddyId, teddyOption, teddyQty);

            fetch("http://localhost:3000/api/teddies/" + teddyId).then(response => response.json())
            .then(function(teddy){

                calculatePrice += parseInt(teddy.price);

            })

        }else{

            console.log("Test failed");

        };
    
    }

    totalPrice.innerHTML = calculatePrice;

};

continueButton.addEventListener("click", function(event){

    event.preventDefault;

    localStorage.clear();

    window.location.href = "/index.html";

});

clearButton.addEventListener("click", function(event){

    localStorage.clear();

});

//window.addEventListener("beforeunload", function(event){

    //localStorage.clear();

//});

function displayTotalQty(){

    let qty = 0;

    if(localStorage.length > 0){

        for(key in localStorage){

            if(!localStorage.hasOwnProperty(key)){
    
                continue;
    
            };
    
            let value = JSON.parse(localStorage.getItem(key));
    
            qty += parseInt(value[2]);
    
            totalQty.innerHTML = qty;
    
        };

    }else{

        totalQty.innerHTML = qty;

    }

};