const dropBtn = document.querySelector(".dropbtn");
const dropContent = document.querySelector(".dropdown-content");
const countriesContainer = document.querySelector(".countries");

dropBtn.addEventListener("click", function () {});

window.addEventListener("click", function (e) {
  if (dropBtn.contains(e.target)) {
    dropContent.classList.toggle("show");
  } else {
    dropContent.classList.remove("show");
  }
});

const renderCountry = function (datas) {
  datas.forEach(function (data) {
    const html = `
      <article class="country">
      <img
        class="country__img"
        src="${data.flag}"
      />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <p class="country__row"><span>Population: ${data.population}</span></p>
        <p class="country__row"><span>Region: ${data.region}</span></p>
        <p class="country__row"><span>Capital: ${data.capital}</span></p>
      </div>
    </article>`;
    countriesContainer.insertAdjacentHTML("beforebegin", html);
  });
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function () {
  getJSON("https://restcountries.com/v2/all")
    .then((data) => renderCountry(data))
    .catch((err) => console.log(err));
};
getCountryData();
