/*
CONSUMINDO UMA API COM JAVASCRIPT
API: https://dog.ceo/api
*/
//================================
// 1- SELECIONAR ELEMENTOS DO HTML
//================================

//Pegar a imagem do cachorro
const dogImage = document.getElementById("dogImage");
//elemento onde aparece o nome da raça
const breedName = document.getElementById("breedName");
//botão que busca cachorro aleatório
const randomBtn = document.getElementById("randomBtn");
//botão que busca a raça
const searchBtn = document.getElementById("searchBtn");
//campo de input onde o usuário digita a raça
const breedInput = document.getElementById("breedInput");
// área onde a imagem aparece
const dogArea = document.querySelector(".dog-area");

//=======================
// 2- URL BASE DA API
//=======================

//endereço principal da API
const API_BASE = "https://dog.ceo/api"

//===========================
// 3- FUNÇÃO QUE CHAMA A API
//===========================

//função assíncrona que faz requisição HTTP
async function fetchFromApi(endpoint){

    //adiciona classe de loading (mostra "Carregando")
    dogArea.classList.add("loading")

    try {
        //montar a URL completa da requisição
        const url = `${API_BASE}${endpoint}`;

        //mostrar no console a URL Chamada
        console.log("Requisição:", url);

        //faz requisição HTTP para a API
        const response = await fetch(url);

        //Converter para JSON
        const data = await response.json();

        //Mostrar a resposta console
        console.log("Resposta:", data);

        //Verificar se a API retornou com sucesso
        if (data.status === "success") {
            //URL da imagem retornada pela API
            const imageUrl = data.message;
            //colocar a imagem no element <img>
            dogImage.src = imageUrl;
            //extrai a raça da URL
            const breed = imageUrl.split("/")[4];
            //substituir "-" por espaço
            const formattedBreed = breed.replace(/-/g," ");

            //deixa a primeira letra maiúscula
            const finalBreed = 
                formattedBreed.charAt(0).toUpperCase() +
                formattedBreed.slice(1);

            //mostra o nome da raça na tela
            breedName.textContent = finalBreed;
        }
    }catch (error){
        //mostrar erro no console
        console.error("Erro:", error)

        //mensagem de erro para o usuário
        breedName.textContent = "Erro ao carregar";

        //remove imagem
        dogImage.src = "";
    } finally {

        // remove estado de loadind
        dogArea.classList.remove("loading");

    }

}
// fetchFromApi ("/breeds/image/random");


//===========================
// 4- FUNÇÃO DE AÇÃO
//===========================

//buscar um cachorro aleatório 
function getRandomDog(){
    fetchFromApi("/breeds/image/random")
}

//busca cachorro por raça
function getBreedDog(){
    //pegar o valor digitado
    let breed = breedInput.value.toLowerCase().trim();

    //verificar se o campo está vazio
    if (!breed) {
        alert("Digite uma raça!");
        return;
    }

    //chamar a API com raça digitada
    fetchFromApi(`/breed/${breed}/images/random`)
}

//===========================
// 5- EVENTOS
//===========================

//clique no botão "aleatório"
randomBtn.addEventListener("click", getRandomDog);

//clique no botão "buscar"
searchBtn.addEventListener("click", getBreedDog)

//clique na imagem gera novo cachorro
dogImage.addEventListener("click", getRandomDog)

//Enter dentro do input
breedIpnut.addEventListener("keypress", function(event){

    //se a tecla pressionada for ENTER
    if (event.key === "Enter"){
        getBreedDog();
    }

});

getRandomDog();