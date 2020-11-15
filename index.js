/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import ids from './data.js';

const baseURL = 'https://anapioficeandfire.com/api/houses/';
const killButton = document.getElementById('kill-random-lord-button');
const housesListPlaceHolder = document.getElementById('got-house-list');

function getLord(placeHolder, url) {
  fetch(url).then((response) => response.json()).then((lordInfo) => {
    placeHolder.innerHTML = lordInfo.name;
  });
}

function getMember(placeHolder, houseID) {
  /* console.log(houseID); */
  fetch(baseURL + houseID).then((response) => response.json()).then((houseInfo) => {
    const membersArray = houseInfo.swornMembers;
    const randomMemberIndex = Math.floor(Math.random(membersArray.length));
    const randomMemberURL = membersArray[randomMemberIndex];
    fetch(randomMemberURL).then((data) => data.json()).then((member) => {
      placeHolder.innerHTML = member.name;
    });
  });
}

function makeHousesList(houseObject, houseID) {
  const houseDiv = document.createElement('div');
  houseDiv.className = 'got-house';
  const title = document.createElement('h1');
  title.className = 'got-house__title';
  title.innerHTML = houseObject.name;
  const lordSpan = document.createElement('span');
  lordSpan.className = 'got-house__current-lord';
  lordSpan.id = houseID;
  houseDiv.appendChild(title);
  houseDiv.appendChild(lordSpan);
  housesListPlaceHolder.appendChild(houseDiv);
  const lordURL = houseObject.currentLord;
  if (lordURL !== '') {
    getLord(lordSpan, lordURL);
  } else {
    getMember(lordSpan, houseID);
  }
}

function getHouseInfo(houseID) {
  fetch(baseURL + houseID).then((response) => response.json()).then((houseInfo) => {
    makeHousesList(houseInfo, houseID);
  });
}

function killLord() {
  const randomId = Math.floor(Math.random() * ids.length);
  const randomHouse = ids[randomId];
  const houseElement = document.getElementById(randomHouse);
  getMember(houseElement, randomHouse);
}

ids.forEach((houseID) => {
  getHouseInfo(houseID);
});

killButton.addEventListener('click', () => {
  killLord();
});
