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

const isInvalidVin = (vehicle) => {
  return vehicle.ModelYear === "";
};

const fetchVehicleData = async (vin) => {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`,
  );

  const data = await response.json();

  const vehicle = data.Results[0];
  console.log(vehicle);

  return vehicle;
};

const displayMessage = (message) => {
  vehicleMessage.textContent = message;
};

const displayVehicle = (vehicle) => {
  vehicleContent.replaceChildren();
  const vehicleInfo = document.createElement("div");
  vehicleInfo.classList.add("vehicle-info");

  const vehicleTitle = document.createElement("h2");
  vehicleTitle.textContent = `${vehicle.ModelYear} ${vehicle.Make} ${vehicle.Model}`;
  vehicleInfo.append(vehicleTitle);

  const vehicleSub = document.createElement("p");
  vehicleSub.textContent = `Engine Size: ${vehicle.DisplacementL}`;
  vehicleInfo.append(vehicleSub);
  vehicleContent.append(vehicleInfo);
};

const createCard = (title) => {
  const card = document.createElement("div");
  card.classList.add("maintenance-card");
  const cardTitle = document.createElement("h2");
  cardTitle.textContent = title;
  card.append(cardTitle);
  return card;
};

const displayOilCard = (container, data) => {
  const card = createCard("Oil Maintenance");
  const oilFilter = document.createElement("p");
  const oilCapacity = document.createElement("p");
  const oilType = document.createElement("p");

  oilFilter.textContent = `Oil Filter: ${data.filter}`;
  oilCapacity.textContent = `Oil Capacity: ${data.capacity}`;
  oilType.textContent = `Oil Type: ${data.type}`;

  card.append(oilFilter, oilCapacity, oilType);
  container.append(card);
};

const displayTireCard = (container, data) => {
  const card = createCard("Tire Maintenance");
  const tirePressureFront = document.createElement("p");
  const tirePressureRear = document.createElement("p");

  tirePressureFront.textContent = `Tire Pressure Front: ${data.frontPsi} `;
  tirePressureRear.textContent = `Tire Pressure Rear: ${data.rearPsi} `;

  card.append(tirePressureFront, tirePressureRear);
  container.append(card);
};

const displayMaintenance = () => {
  const maintenanceSection = document.createElement("div");
  maintenanceSection.classList.add("maintenance-section");
  const oilData = {
    filter: "STP S7317",
    capacity: "4.6 qt",
    type: "0W-16",
  };

  const tireData = {
    frontPsi: "36 psi",
    rearPsi: "36 psi",
  };

  displayOilCard(maintenanceSection, oilData);
  displayTireCard(maintenanceSection, tireData);
  vehicleContent.append(maintenanceSection);
};

const handleSearch = async () => {
  const vin = getVin();

  if (isEmptyVin(vin)) {
    displayMessage("Please enter a VIN");
    return;
  }

  vehicleContent.replaceChildren();

  displayMessage(`Searching VIN: ${vin}`);

  try {
    const vehicle = await fetchVehicleData(vin);

    if (isInvalidVin(vehicle)) {
      displayMessage("Please enter a valid VIN");
      return;
    }
    displayVehicle(vehicle);
    displayMaintenance();
    displayMessage("");
  } catch (error) {
    console.log(error);
    displayMessage("Something went wrong. Please try again.");
  }
};

searchButton.addEventListener("click", handleSearch);
