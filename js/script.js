const searchButton = document.querySelector(".button-search");
const searchPopup = document.querySelector(".modal");
const searchForm = searchPopup.querySelector(".modal-search-form");

const searchArrivalDate = searchPopup.querySelector("[name=arrival-date]");
const searchDepartureDate = searchPopup.querySelector("[name=departure-date]");
const searchAdults = searchPopup.querySelector("[name=adults]");
const searchChildren = searchPopup.querySelector("[name=children]");

let isStorageSupport = true;
let storageAdults = "";
let storageChildren = "";

try {
  storageAdults = localStorage.getItem("adults");
  storageChildren = localStorage.getItem("children");
} catch (err) {
  isStorageSupport = false;
}

if (!searchPopup.classList.contains("modal-hide") && storageAdults && storageChildren) {
  searchAdults.value = storageAdults;
  searchChildren.value = storageChildren;
}

searchButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  searchPopup.classList.toggle("modal-hide");

  if (!searchPopup.classList.contains("modal-hide")) {
    searchArrivalDate.focus();
    searchPopup.classList.add("modal-show-animation");
  } else {
    searchPopup.classList.remove("modal-show-animation");
    searchPopup.classList.remove("modal-error");
  }
});

searchForm.addEventListener("submit", function(evt) {
  if (!searchArrivalDate.value || !searchDepartureDate.value || !searchAdults.value || !searchChildren.value) {
    evt.preventDefault();
    searchPopup.classList.remove("modal-error");
    searchPopup.offsetWidth = searchPopup.offsetWidth;
    searchPopup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("adults", searchAdults.value);
      localStorage.setItem("children", searchChildren.value);
    }
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (!searchPopup.classList.contains("modal-hide")) {
      evt.preventDefault();
      searchPopup.classList.add("modal-hide");
      searchPopup.classList.remove("modal-error");
    }
  }
});