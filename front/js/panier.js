let clearButton = document.getElementById("clearLocalStorage");

const panierContainer = document.getElementById("panierContainer");
const message = document.getElementById("message");
const totalPrice = document.getElementById("totalPrice");
const totalPriceText = document.getElementsByClassName("totalPriceText");
const shopContainer = document.getElementById("shopContainer");

let productList = [];

let calculatePrice = 0;

let shopForm = document.getElementById("shopForm");

let totalQty = document.getElementById("totalQty");

if (localStorage.length > 0) {

    for (key in localStorage) {

        if(!localStorage.hasOwnProperty(key)){
            continue;
        }

        let value = JSON.parse(localStorage.getItem(key))

        let id = value[0];
        let teddyOption = value[1];
        let qty = value[2];

        parseInt(qty);

        displayCommand(id, teddyOption, qty);
        
        displayTotalPrice(id, qty);

        displayTotalQty();

    };

} else {

    message.innerHTML = "VOTRE PANIER EST VIDE !";
    message.classList.add("text-center");

    for (i = 0; i < 2; i++) {

        let text = totalPriceText[i];

        text.setAttribute("style", "display: none");

    }

    shopContainer.setAttribute("style", "display: none");

}

function displayCommand(id, teddyOption, qty) {

    fetch("http://localhost:3000/api/teddies/" + id).then(response => response.json())
        .then(function (response) {

            if (localStorage.length > 0) {

                let teddy = response;

                let item = document.createElement("li");
                item.classList.add("text-center", "rounded", "p-2", "mt-4", "bg-dark");
                panierContainer.appendChild(item);

                let teddyImg = document.createElement("img");
                teddyImg.classList.add("img-fluid", "pt-2");
                teddyImg.style.maxHeight = "250px";
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
                qtyStr.innerHTML = qty;
                item.appendChild(qtyStr);

                let priceText = document.createElement("h2");
                priceText.classList.add("text-center", "text-primary");
                priceText.innerHTML = "Prix";
                item.appendChild(priceText);

                let teddyPrice = document.createElement("h2");
                teddyPrice.classList.add("text-center", "text-light");
                teddyPrice.innerHTML = teddy.price + "€";
                item.appendChild(teddyPrice);

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("deleteButton", "btn", "btn-primary", "m-3");
                deleteButton.innerHTML = "SUPPRIMER";
                let qtyDefault = 1;
                deleteButton.value = [teddy._id, teddyOption, qtyDefault];
                item.appendChild(deleteButton);
                productList.push(id);

                deleteButtonListener(deleteButton);

                for (i = 0; i < 2; i++) {

                    let text = totalPriceText[i];

                    text.setAttribute("style", "display: block");

                }

                shopContainer.setAttribute("style", "display: block");

            }

        })

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

function deleteButtonListener(button) {

    button.addEventListener("click", function (event) {

        let key = button.value;

        localStorage.removeItem(key);

        window.location.reload();

    });

};

shopForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let contact = getFormValue(shopForm);

    let products = productList;

    let objectRequest = JSON.stringify({
        contact,
        products
    });

    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: objectRequest,
        headers: { "Content-type": "application/json" }
    }).then(response => response.json())
        .then(function (response) {
            localStorage.setItem("orderId", response.orderId);
            localStorage.setItem("firstName", response.contact.firstName);
            localStorage.setItem("lastName", response.contact.lastName);
            localStorage.setItem("address", response.contact.address);
            localStorage.setItem("city", response.contact.city);
            localStorage.setItem("email", response.contact.email);
            window.location.href = "/front/pages/commande.html";
        })
        .catch(function (response) {
            console.log(response);
        })

});

function getFormValue(form) {

    let contact = {
        firstName: form[0].value,
        lastName: form[1].value,
        address: form[2].value,
        city: form[3].value,
        email: form[4].value
    };

    return contact;

}

clearButton.addEventListener("click", function (event) {

    localStorage.clear();

});

if (localStorage.length > 0) {

    for (key in localStorage) {

        if (!localStorage.hasOwnProperty(key)) {
            continue;
        };

        console.log(localStorage.getItem(key));
        console.log(key);

    };

    console.log(localStorage.length);
    console.log(productList);

};

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