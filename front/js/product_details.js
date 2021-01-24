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

    let panier = JSON.parse(localStorage.getItem("panier"));

    let length = panier.length;

    if(length > 0){

        let panier = JSON.parse(localStorage.getItem("panier"));

        for(i in panier){

            let teddy = panier[i];

            let id = teddy[0];
            console.log("id =" + id);

            let opt = teddy[1];
            console.log("opt =" + opt);

            let qty = teddy[2];
            console.log("qty =" + qty);

            if(id == button.value && opt == select.value){

                parseInt(qty);

                qty++;

                console.log("newQty =" + qty);

                localStorage.setItem("panier", JSON.stringify(panier));

                console.log(localStorage.getItem("panier"));

            };

        }

    }else{

        let teddy = [button.value, select.value, "1"];

        let panier = JSON.parse(localStorage.getItem("panier"));

        panier.push(teddy);

        localStorage.setItem("panier", JSON.stringify(panier));
        
        displayTotalQty();
    }

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