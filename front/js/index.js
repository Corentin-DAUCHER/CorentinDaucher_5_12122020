const container = document.getElementById("productContainer");

let clearButton = document.getElementById("clearLocalStorage");

let totalQty = document.getElementById("totalQty");

let panier = [];

localStorage.setItem("panier", JSON.stringify(panier));

fetch("http://localhost:3000/api/teddies").then(response => response.json())
.then(function(response){
    displayTeddy(response);
    displayTotalQty();
})
.catch(function(){
    alert("Echec de la récupération des données !")
});

function displayTeddy(teddy){

    for(i in teddy){

        //col

        let col = document.createElement("div");
        col.classList.add("col-sm-12", "col-md-6", "col-lg-4", "p-3");
        container.appendChild(col);

        //card

        let card = document.createElement("div");
        card.classList.add("card", "bg-dark", "shadow", "text-center");
        col.appendChild(card);

        //cardImg

        let cardImg = document.createElement("img");
        cardImg.classList.add("card-img-top", "p-1");
        cardImg.style.maxHeight = "230px";
        cardImg.style.objectFit = "cover";
        cardImg.src = teddy[i].imageUrl;
        card.appendChild(cardImg)

        //cardBody

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);

        //teddyName

        let teddyName = document.createElement("h4");
        teddyName.classList.add("card-title", "text-light");
        teddyName.innerHTML = teddy[i].name;
        cardBody.appendChild(teddyName);

        //teddyDescription

        let teddyDescription = document.createElement("p");
        teddyDescription.classList.add("card-text", "text-light");
        teddyDescription.innerHTML = teddy[i].description;
        cardBody.appendChild(teddyDescription);

        //teddyPrice

        let teddyPrice = document.createElement("p");
        teddyPrice.classList.add("card-text", "text-light");
        teddyPrice.innerHTML = teddy[i].price + "€";
        cardBody.appendChild(teddyPrice);

        //teddyDetailsButton

        let teddyDetailsButton = document.createElement("button");
        teddyDetailsButton.classList.add("productDetailsButton", "btn-primary", "p-2", "rounded", "d-block", "w-100");
        teddyDetailsButton.innerHTML = "DETAILS";
        teddyDetailsButton.setAttribute("type", "button");
        teddyDetailsButton.setAttribute("value", teddy[i]._id);
        cardBody.appendChild(teddyDetailsButton);

        teddyDetailsButton.addEventListener("click", function(){
            let teddy_id = teddyDetailsButton.value;

            window.location.href = "./front/pages/product_details.html?id=" + teddy_id;
            
        });

    }
};

clearButton.addEventListener("click", function(event){

    localStorage.clear();

});

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