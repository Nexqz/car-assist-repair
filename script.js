const searchButton = document.querySelector("#search-btn");
const vinInput = document.querySelector("#vin-search");
const vehicleContent = document.querySelector(".vehicle-content");
const vehicleMessage = document.querySelector(".vehicle-message");

const getVin = () => {
  return vinInput.value.trim();
};

const isEmptyVin = (vin) => {
  return vin === "";
};

const fetchVehicleData = async (vin) => {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`,
  );

  const data = await response.json();

  const vehicle = data.Results[0];

  return vehicle;
};

const displayMessage = (message) => {
  vehicleMessage.textContent = message;
};

const displayVehicle = (vehicle) => {
  vehicleContent.replaceChildren();
  const vehicleTitle = document.createElement("h2");
  vehicleTitle.textContent = `${vehicle.ModelYear} ${vehicle.Make} ${vehicle.Model}`;
  vehicleContent.append(vehicleTitle);

  const vehicleSub = document.createElement("p");
  vehicleSub.textContent = `Engine Size: ${vehicle.DisplacementL}`;
  vehicleContent.append(vehicleSub);
};

const handleSearch = async () => {
  const vin = getVin();

  if (isEmptyVin(vin)) {
    displayMessage("Please enter a VIN");
    return;
  }

  displayMessage(`Searching VIN: ${vin}`);

  const vehicle = await fetchVehicleData(vin);

  displayVehicle(vehicle);

  console.log(vehicle);
};

searchButton.addEventListener("click", handleSearch);
