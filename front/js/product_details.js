let clearButton = document.getElementById("clearLocalStorage");
let totalQty = document.getElementById("totalQty");

let urlStr = window.location.href;
let url = new URL(urlStr);
let id = url.searchParams.get("id");

let teddyImg = document.getElementById("teddyImg");
let teddyName = document.getElementById("teddyName");
let teddyDescription = document.getElementById("teddyDescription");
let teddyPrice = document.getElementById("teddyPrice");
let select = document.getElementById("select");
let button = document.getElementById("button");

let j = 0;

let panier = [];

if(localStorage.length == 0){

    localStorage.setItem("panier", JSON.stringify(panier));

};

fetch("http://localhost:3000/api/teddies/" + id).then(response => response.json())
.then(function(response){
    displayOneTeddy(response);
    displayTotalQty();
})
.catch(function(){
    alert("ECHEC DE LA RECUPERATION DES DONNEES !")
});

function displayOneTeddy(teddy){

    teddyImg.src = teddy.imageUrl;

    teddyName.innerHTML = teddy.name;

    teddyName.value = teddy.name;

    teddyDescription.innerHTML = teddy.description;

    teddyPrice.innerHTML = teddy.price + "€";

    getTeddyColors(teddy);

    button.value = teddy._id;

};

function getTeddyColors (teddy){

    let colors = teddy.colors;
    let j = -1;    

    for(i in colors){

        j++;

        let option = document.createElement("option");
        option.value = j;
        option.innerHTML = colors[i];
        select.appendChild(option);

    };

};

button.addEventListener("click", function(event){

    let teddy =[];

    if(localStorage.length > 0){

        let panier = JSON.parse(localStorage.getItem("panier"));

        if(panier.length == 0){

            teddy = [button.value, select.value, "1"];

            panier.push(teddy);

            console.log("PANIER : " + localStorage.getItem("panier"));

        }else{

            for(i in panier){

                let item = panier[i];

                let id = item[0];

                let opt = item[1];

                let qty = item[2];

                if(id == button.value && opt == select.value){

                    parseInt(qty);

                    qty++;

                    item[2] = JSON.stringify(qty);

                    teddy = [id, opt, qty];

                    console.log("PANIER : " + localStorage.getItem("panier"));

                    break;

                }

            }

        }

        panier.push(teddy);

        localStorage.setItem("panier", JSON.stringify(panier));

    }else {

        alert("Erreur dans le localStorage");

    };

});

function displayTotalQty(){

    let qty = 0;

    if(localStorage.length > 0){

        

    }else{

        totalQty.innerHTML = qty;

    }

};

clearButton.addEventListener("click", function(event){

    localStorage.clear();

});