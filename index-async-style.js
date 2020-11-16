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

function recordHouseData({ id, name, lordName }) {
  document.getElementById('got-house-list').innerHTML += `
  <div class="got-house">
    <h1 class="got-house__title">${name}</h1>
    <span id=${id} class="got-house__current-lord">${lordName}</span>
  </div>
  `;
}

function getData(url) {
  // eslint-disable-next-line no-console
  return fetch(url).then((data) => data.json()).catch((err) => console.error(err));
}

function getRandom(members) {
  return members[Math.floor(Math.random() * members.length)];
}

async function getHouseData(url, id) {
  const house = await getData(url);
  const currLord = house.currentLord;
  const lordName = (await getData(currLord !== '' ? currLord : getRandom(house.swornMembers))).name;
  recordHouseData({ id, name: house.name, lordName });
}

async function killButtonPressed() {
  const id = getRandom(ids);
  const knightURL = getRandom((await getData(baseURL + id)).swornMembers);
  document.getElementById(id).innerHTML = (await getData(knightURL)).name;
}

ids.forEach((houseID) => {
  getHouseData(baseURL + houseID, houseID);
});
document.getElementById('kill-random-lord-button').addEventListener('click', killButtonPressed);
