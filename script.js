// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// // NEW COUNTRIES API URL (use instead of the URL shown in videos):
// // https://restcountries.com/v2/name/portugal

// // NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// // https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// ///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbour = function (country) {
//   //  AJAX CALL COUNTRY
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // Render country 1
//     renderCountry(data);

//     // get neighbour country

//     const neighbour = data.borders?.[0];
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('usa');

// const request = new XMLHttpRequest();

// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };
// getCountryData('portugal');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'Something Went Wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = country => {
//   // prettier-ignore
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // country 2

//       return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`).then(
//         data => renderCountry(data, 'neighbour'),
//       );
//     })

//     .catch(err => {
//       renderError(`Something went wrong 💥💥💥${err.message}. Try Again! `);
//       console.error(`${err} 💥💥💥`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', () => {
//   getCountryData('china');
// });

// const whereAmI = (lat, lng) => {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
//   )
//     .then(response => {
//       if (!response.ok) throw new Error(`${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.locality}`);
//     })
//     .catch(err => console.error(`${err.message} 💥💥💥`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// console.log('Test Start');
// setTimeout(() => console.log('0 sec Timer'), 0);
// Promise.resolve('Resolved Promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test End');

// building a simple promise

// const lotteryPromise = new Promise((resolve, reject) => {
//   // an executor fn goes here
//   console.log('Lottery draw is happening');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰💰');
//     } else {
//       reject(new Error('You Lost your money 💩'));
//     }
//   }, 2000);
// });

// // consuming promise => convert call back based function to promises
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // promisifying
const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2).then(() => {
//   console.log('i waited for 2 seconds');
//   return wait(1);
// });

// lets promisify Geolocation

// console.log('getting position....');

// const getPosition = () => {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = (lat, lng) => {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
//       );
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥💥💥`));
// };

// btn.addEventListener('click', whereAmI);

// CHALLENGE 2
// const getImage = () => {
//   return new Promise((resolve, reject) => {

//   });
// };

// const createImage = imagePath => {
//   return new Promise((resolve, reject) => {
//     const newImage = document.createElement('img');
//     newImage.src = imagePath;

//     const imageDiv = document.querySelector('.images');
//     if (imageDiv) {
//       newImage.addEventListener('load', () => {
//         imageDiv.appendChild(newImage);
//       });
//     }
//     resolve(newImage);

//     newImage.addEventListener('error', () => {
//       reject(new Error('Image not found...'));
//     });
//   });
// };

// let currentImg;
// createImage('/img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 Loaded....');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('/img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 Loaded....');
//     return wait(2);
//   })
//   .catch(err => console.error(err));

// consuming promises with async await
const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async () => {
  try {
    // GeoLoCATION
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse GeoCoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryName}`,
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong 💥💥 ${err.message}`);

    // reject prmise returned
    throw err;
  }
};

// console.log('1: will get location');

// console.log('3: finished getting location');

// Returning values from async functions

// async always returns a promise not the value we'd like to get
// the value returned will become the fufilled value of the promise
// then we use "then" to get the fufilled value
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`${err.message}`))
//   .finally(() => console.log('3: Finised getting location'));

// (async () => {
//   try {
//     const res2 = await whereAmI();
//     console.log(res2);
//   } catch (err) {
//     console.error(`${err.message}`);
//   }
// })();

// running promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'nigeria');
