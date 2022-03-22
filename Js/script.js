const dropBtn = document.querySelector(".dropbtn");
const dropContent = document.querySelector(".dropdown-content");
const regionF = dropContent.querySelectorAll("a");
const countriesContainer = document.querySelector(".countries");
const countryData = document.querySelector(".country");
const input = document.querySelector("#search");

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
            <img class="country__img" src="${country.flag}" />
            <div class="country__data">
              <h3 class="country__name">${country.name}</h3>
              <p class="country__row"><span>Population: </span>${country.population}</p>
              <p class="country__row region"><span>Region: </span>${country.region}</p>
              <p class="country__row"><span>Capital: </span>${country.capital}</p>
            </div>
    `;

    countriesContainer.appendChild(countryEL);
  });
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
