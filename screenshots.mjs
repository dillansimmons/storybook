/* eslint-disable no-console */
import puppeteer from 'puppeteer';

// !!! Your local build must be running for this script to work
// Assumes
export async function screenshots() {
  const url = 'http://localhost:1234/'; // local server url where your project is running
  const numberOfScreenshots = 5; // how many screenshots to take
  const animationDelay = 15000; // how long to wait for animation / reload to run in ms

  // log how long it will take
  console.log(`⌚ This will take roughly ${msToMinutes(numberOfScreenshots * animationDelay)} minutes to complete.`)

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.setViewport({ width: 2400, height: 2400 });

  for (let i = 0; i < numberOfScreenshots; i++) {
    await new Promise(resolve => setTimeout(resolve, animationDelay));
    await page.screenshot({
        path: `./screenshots/shot-${i}.jpg`,
        fullPage: true
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
  }
  browser.close();
}

// get how many minutes from ms
function msToMinutes(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}.${(seconds < 10 ? '0' : '') + seconds}`;
}

screenshots();
