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

const displayOilCard = (container) => {
  const card = document.createElement("div");
  const cardTitle = document.createElement("h2");
  const oilFilter = document.createElement("p");
  const oilCapacity = document.createElement("p");
  const oilType = document.createElement("p");

  cardTitle.textContent = "Oil Maintenance";
  oilFilter.textContent = `Oil Filter: ${0}`;
  oilCapacity.textContent = `Oil Capacity: ${0}`;
  oilType.textContent = `Oil Type: ${0}`;

  card.append(cardTitle, oilFilter, oilCapacity, oilType);
  container.append(card);
};

const displayTireCard = (container) => {
  const card = document.createElement("div");
  const cardTitle = document.createElement("h2");
  const tirePressureFront = document.createElement("p");
  const tirePressureRear = document.createElement("p");

  cardTitle.textContent = "Tire Maintenance";
  tirePressureFront.textContent = `Tire Pressure Front: ${0} `;
  tirePressureRear.textContent = `Tire Pressure Rear: ${0} `;

  card.append(cardTitle, tirePressureFront, tirePressureRear);
  container.append(card);
};

const displayMaintenance = () => {
  const maintenanceSection = document.createElement("div");
  maintenanceSection.classList.add("maintenance-section");

  displayOilCard(maintenanceSection);
  displayTireCard(maintenanceSection);
  vehicleContent.append(maintenanceSection);
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

  displayMaintenance();
};

searchButton.addEventListener("click", handleSearch);
