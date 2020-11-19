const ids = [
  7, // Eyrie
  17, // Baratheon
  169, // Greyjoy
  229, // Lannister
  362, // Stark
  378, // Targaryen
  395, // Tully
  398, // Tyrell
];
const baseURL = 'https://anapioficeandfire.com/api/houses/';
const housesListPlaceholder = document.getElementById('got-house-list');

const lordSpans = {};

function recordHouseData(id, name) {
  const houseDiv = document.createElement('div');
  houseDiv.className = 'got-house';
  const title = document.createElement('h1');
  title.className = 'got-house__title';
  title.innerHTML = name;
  houseDiv.appendChild(title);
  houseDiv.appendChild(lordSpans[id]);
  housesListPlaceholder.appendChild(houseDiv);
}

function getData(url) {
  // eslint-disable-next-line no-console
  return fetch(url).then((data) => data.json()).catch((err) => console.error(err));
}

function getRandom(members) {
  return members[Math.floor(Math.random() * members.length)];
}

function addLord(id, name) {
  const span = document.createElement('span');
  span.className = 'got-house__current-lord';
  span.textContent = name;
  lordSpans[id] = span;
}

async function getHouseData(url, id) {
  const house = await getData(url);
  const currLord = house.currentLord;
  const lordName = (await getData(currLord !== '' ? currLord : getRandom(house.swornMembers))).name;
  addLord(id, lordName);
  recordHouseData(id, house.name);
}

async function killButtonPressed() {
  const id = getRandom(ids);
  const knightURL = getRandom((await getData(baseURL + id)).swornMembers);
  lordSpans[id].textContent = (await getData(knightURL)).name;
}

ids.forEach((houseID) => {
  getHouseData(baseURL + houseID, houseID);
});
document.getElementById('kill-random-lord-button').addEventListener('click', killButtonPressed);
