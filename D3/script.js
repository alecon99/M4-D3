/* elementi DOM */
let searchInput = document.getElementById("input_text");
let contPhoto = document.getElementById("photo_container");
let homeLogo = document.getElementById("home_logo");
let homePage = document.getElementById("home_page");

/* funzione reset pagina a schermata principale */
homeLogo.addEventListener("click",()=>{
    contPhoto.innerHTML="";
    homePage.classList.remove("d-none");
});

/* funzioni valore input */
let keySearch = "";
let lowKeySearch = "";

/* funzione che avvia ricerca */
function search(){
  if (searchInput.value !== "") {
  keySearch = searchInput.value
  lowKeySearch = keySearch.toLowerCase();
  /* reset ricerca */
  searchInput.value = "";
  start()
  } else {
    alert("Inserisci parola chive");
    homePage.classList.remove("d-none");
  }
  /* reset card */
  contPhoto.innerHTML="";
}

/* funzione preleva info con API e immetti sul DOM */
function start(){
    /* rimozione home page */
    homePage.classList.add("d-none");
    fetch("https://api.pexels.com/v1/search?query="+ lowKeySearch , {headers:{Authorization: "oVtyEKyzBa4kyiuylaeUv7Q35F9ttRxM6KzX6lg0p0O6fr1hRasTt43F"}})
    .then((Response)=> Response.json())
    .then((object)=> {
        let items = object.photos;
        for (let i = 0; i < items.length; i++) {
            let imgPhoto =  items[i].src.medium;
            let imgAlt = items[i].alt;
            let imgPhotograph = items[i].photographer;
            const newDiv = document.createElement("div");
            newDiv.classList.add("col-12", "col-sm-6", "col-md-4","col-lg-3", "col-xl-2","d-flex", "justify-content-center")
            newDiv.innerHTML=
            `<div id="card_container" class="card my-3" style="width: 18rem;">
                <img src="${imgPhoto}" class="card-img-top" alt="${imgAlt}">
                <div class="card-body">
                    <p class="card-text">${imgPhotograph}</p>
                </div>
            </div>`;
            contPhoto.appendChild(newDiv);
        }
    })
    .catch((err)=> console.log(err))
}

