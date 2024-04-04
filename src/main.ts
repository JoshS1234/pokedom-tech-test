import "./styles/style.scss";
import pokemonArray from "./data/pokemon";
import { Pokemon } from "./data/types";

const cardContainer = document.querySelector(".card-container");
const body = document.querySelector("body");

if (!cardContainer) {
  throw new Error("Issue with finding card-container");
} else if (!body) {
  throw new Error("Issue with finding body");
}

const convertToCardHTML = (pokemon: Pokemon) => {
  const capitalisedName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const HTML = `
        <div class="card">
          <img src=${pokemon.sprite} alt=${capitalisedName}/>
          <div class="card__content">
              <p class="card__heading">${capitalisedName}</p>
              <p class="card__text">${capitalisedName} (#${
    pokemon.id
  }) is a ${pokemon.types.join(" & ")} type pokemon.</p>
          </div>
          </div>
          `;
  return HTML;
};

const cardHTML = pokemonArray.map((pokemon) => convertToCardHTML(pokemon));
cardContainer.innerHTML = cardHTML.join("");

/////////////////////////////////////////////////////////////////
//Extension

const pokemonTypes = [
  "Bug",
  "Dragon",
  "Electric",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Water",
];
const typeRadio = pokemonTypes.map((type) => {
  return `<input type="radio" name="type" id="${type.toLowerCase()}" value="${type.toLowerCase()}">
  <label for="${type.toLowerCase()}">${type}</label><br>`;
});

// const filterHTML = `
// <div class="search-box search-box--name" >
//     <label for="search-box__textbox-name">Search by name</label>
//     <input type="text" name="search-box__name-textbox" class=" search-box__name-textbox">
// </div>
// <div class="search-box search-box--type" >
// <p>Search by type</p>
// ${typeRadio.join("")}
// </div>
// <div class="search-box search-box--number" >
// <p>Show how many results</p>
//     <input type="radio" name="number" id="5" value="5">
//     <label for="5">5</label><br>
//     <input type="radio" name="number" id="10" value="10">
//     <label for="10">10</label><br>
//     <input type="radio" name="number" id="20" value="20">
//     <label for="20">20</label><br>
//     <input type="radio" name="number" id="all" value="all">
//     <label for="all">All</label><br>
// </div>
// <input type="submit" value="search" id="search-button"/>
// <input type="reset" value="reset" id="reset-button">
// `;

// let searchContainer = document.createElement("form");
// searchContainer.innerHTML = filterHTML;
// body.insertBefore(searchContainer, cardContainer);

const nameTextbox = document.querySelector(".search-box__name-textbox");

const typeCheckbox = document.querySelector(".form__search-box--type");

const showNumberCheckbox = document.querySelector(".form__search-box--number");

const searchButton = document.querySelector("#search-button");
const resetButton = document.querySelector("#reset-button");

if (!nameTextbox) {
  throw new Error("name searchbox not available");
} else if (!typeCheckbox) {
  throw new Error("type filter not available");
} else if (!showNumberCheckbox) {
  throw new Error("show number filter not available");
} else if (!searchButton) {
  throw new Error("searchButton");
} else if (!resetButton) {
  throw new Error("resetButton");
}

typeCheckbox.innerHTML = `<p>Search by type</p>${typeRadio.join("")}`;

const handleSubmit = (e: Event) => {
  e.preventDefault();

  let pokemonArray2 = [...pokemonArray];

  const target = e.target as HTMLInputElement;
  const form = target.form as HTMLFormElement;

  //get name value
  const nameTextbox = form.children[0].children[0]
    .children[1] as HTMLInputElement;
  console.log(nameTextbox);
  const searchStr = nameTextbox.value.toLowerCase();

  //get type
  let type = "";
  const typeDiv = form.children[0].children[1]
    .childNodes as NodeListOf<HTMLInputElement>;
  console.log(Array(typeDiv));
  typeDiv.forEach((element) => {
    if (element.checked == true) {
      type = element.value;
    }
  });

  //get number to display
  let showNum;
  const numDiv = form.children[0].children[2]
    .childNodes as NodeListOf<HTMLInputElement>;
  numDiv.forEach((element) => {
    if (element.checked == true) {
      showNum = element.value;
    }
  });

  let filteredArray = pokemonArray2.filter((pokemon) => {
    if (type) {
      return pokemon.name.includes(searchStr) && pokemon.types.includes(type);
    } else {
      return pokemon.name.includes(searchStr);
    }
  });

  if (typeof showNum == "string") {
    if (showNum != "all") {
      filteredArray = filteredArray.slice(0, Number(showNum));
    }
  }

  const filteredCardsHTML = filteredArray.map((pokemon) => {
    return convertToCardHTML(pokemon);
  });

  cardContainer.innerHTML = filteredCardsHTML.join("");
};

const handleReset = () => {
  cardContainer.innerHTML = cardHTML.join("");
};

searchButton.addEventListener("click", handleSubmit);
resetButton.addEventListener("click", handleReset);
