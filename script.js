/*
CONSUMINDO UMA API COM JAVASCRIPT
API : https://dog.ceo/api
*/

// 1-SELECIONAR ELEMENTOS DO HTML

//Pegar a imagem do cachorro
const dogImage = document.getElementById("docImage");
//elemento onde aparece o nome da raça
const breedName = document.getElementById("breedName");
//botão que busca cachorro aleatório
const randomBtn = document.getElementById("randomBtn");
//botão que busca a raça
const searchBtn = document.getElementById("searchBtn");
//campo de input onde o usúario digita a raça
const breendInput = document.getElementById("breendInput");
//área onde a imagem aparece
const dogArea = document.querySelector(".dog-area");


const API_BASE = "https://dog.ceo/api"


async function fetchFromApi(endpoint){

    dogArea.classList.add("loading")

    try {
        const url = `${API_BASE}${endpoint}`

        console.log('Requisição:', url);

        const response = await fetch(url);

        const data = await response.json();

        console.log("Resposta:", data);

        if (data.status === "success") {
            const imageUrl = data.message;
            dogImage.src = imageUrl;

            const breed = imageUrl.split("/")[4];
            const fomattedBreed = breed.replace(/-/g, " ");

            const finalBreed =
                formattedBreed.charAt(0).toUpperCase() +
                formattedBreed.slice(1);

            breedName.textContent = finalBreed;
        }
    }catch (error){
        console.error("Erro:", error)

        breedName.textContent = "Erro ao carregar";

        dogImage.src = "";

    } finally {
        dogArea.classList.remove("loading");
    }




}
fetchFromApi ("/breeds/image/random");