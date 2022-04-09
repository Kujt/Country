const dropBtn = document.querySelector(".dropbtn");
const dropContent = document.querySelector(".dropdown-content");
const regionF = dropContent.querySelectorAll("li");
const countriesContainer = document.querySelector(".countries");
const modal = document.querySelector(".country-detail");
const modalBody = document.querySelector(".modal-body");
const input = document.querySelector("#search");
const modalCloseBtn = document.getElementById("close");
const search = document.querySelector(".search");
const closeBtn = document.querySelector(".detail-btn");

window.addEventListener("click", function (e) {
  if (dropBtn.contains(e.target)) {
    dropContent.classList.toggle("show");
  } else {
    dropContent.classList.remove("show");
  }
});

async function getCountries() {
  try {
    const res = await fetch("https://restcountries.com/v2/all");
    const countries = await res.json();
    displayCountries(countries);
  } catch (err) {
    console.log(err);
  }
}
getCountries();

function displayCountries(countries) {
  countriesContainer.innerHTML = "";

  countries.forEach((country) => {
    const countryEL = document.createElement("div");
    countryEL.classList.add("country");
    countryEL.innerHTML = `
            
            <img class="country__img" src="${country.flag}" alt="${country.name}" />
          
            <div class="country__data">
              <h3 class="country__name">${country.name}</h3>
              <ul>
              <li class="country__row"><span>Population: </span>${country.population}</li>
              <li class="country__row region"><span>Region: </span>${country.region}</li>
              <li class="country__row"><span>Capital: </span>${country.capital}</li>
            </ul>
            </div>
    `;

    countryEL.addEventListener("click", function () {
      closeBtn.style.display = "block";
      countriesContainer.style.display = "none";
      search.style.display = "none";
      modal.style.display = "flex";
      showCountryDetails(country);
    });

    countriesContainer.appendChild(countryEL);
  });
}

function showCountryDetails(country) {
  modalBody.innerHTML = `
 
<div class="details">
<div class="details__flag">
  <img src="${country.flag}" alt="${name}" />
</div>
<div class="details__about">
  <div class="details__about--title">
    <h2>${country.name}</h2>
  </div>
  <div class="details__about--left">
  <ul>
  <li>
    Native name:
    <span class="details_about--native-name"
      >${country.nativeName}</span
    >
  </li>
  <li>
    Population:
    <span class="details__about--population"
      >${country.population}</span
    >
  </li>
  <li>
    Region:
    <span class="details__about--region">${country.region}</span>
  </li>
  <li>
    Sub Region:
    <span class="details__about--sub-region">
      ${country.subregion}</span
    >
  </li>
  <li>
   Sub Region:
  <span class="details__about--sub-region">
    ${country.subregion}</span
  >
  </li>
  <li>
    Capital:
    <span class="details__about--capital"> ${country.capital}</span>
  </li>
  
</ul>
  </div>
  <div class="details__about--right">
  <ul>
  <li>
    Top Level Domain:
    <span class="details__about--top-domain">
      ${country.topLevelDomain[0]}</span
    >
  </li>
  <li>
    Currencies:
    <span class="details__about--currencies">
      ${country.currencies.map((currency) => currency.code)}</span
    >
  </li>
  <li>
    Languages:
    <span class="details__about--languages">
      ${country.languages.map((language) => language.name)}</span
    >
  </li>
</ul>
  </div>
  
</div>
</div>

`;
}

input.addEventListener("input", function (e) {
  const value = e.target.value;
  const countryName = document.querySelectorAll(".country__name");

  countryName.forEach((el) => {
    if (el.innerText.toLowerCase().includes(value.toLowerCase())) {
      el.parentElement.parentElement.style.display = "block";
    } else {
      el.parentElement.parentElement.style.display = "none";
    }
  });
});

regionF.forEach((f) => {
  f.addEventListener("click", function () {
    const value = f.innerText;
    const region = document.querySelectorAll(".region");

    region.forEach((r) => {
      if (r.innerText.includes(value) || value === "All") {
        r.parentElement.parentElement.style.display = "block";
      } else {
        r.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

modalCloseBtn.addEventListener("click", function () {
  modal.style.display = "none";
  countriesContainer.style.display = "flex";
  search.style.display = "flex";
});
