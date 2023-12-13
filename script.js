'use strict';

// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
const body = document.querySelector('.images');
let currentImg;

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImg = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = `${imgPath}`;
    img.addEventListener('load', () => {
      body.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

// part 1
const loadNPause = async function () {
  try {
    const firstImg = await createImg('img/img-1.jpg');
    currentImg = firstImg;
    await wait(2);
    body.removeChild(currentImg);
    await wait(2);
    const secondImg = await createImg('img/img-2.jpg');
    currentImg = secondImg;
    await wait(2);
    body.removeChild(currentImg);
    await wait(2);
    const thirdImg = await createImg('img/img-3.jpg');
    currentImg = thirdImg;
    await wait(2);
    body.removeChild(currentImg);
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

// part 2
const loadAll = async function (arr) {
  try {
    const imgsPromise = arr.map(async img => await createImg(img));
    console.log(imgsPromise); // return an array of promises
    const imgsArr = await Promise.all(imgsPromise);
    console.log(imgsArr); // return fulfill values of promises
    imgsArr.forEach(img => {
      img.classList.add('parallel');
      console.log(img);
    });
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
