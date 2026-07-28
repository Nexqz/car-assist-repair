const searchButton = document.querySelector("#search-btn");
const vinInput = document.querySelector("#vin-search");
const vehicleMessage = document.querySelector(".vehicle-message");

searchButton.addEventListener("click", () => {
  const vin = vinInput.value.trim();
  if (vin === "") {
    vehicleMessage.textContent = "Please enter a VIN";
  } else {
    vehicleMessage.textContent = `Searching VIN: ${vin}`;
  }
});
