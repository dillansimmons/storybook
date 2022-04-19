/* eslint-disable no-console */
import puppeteer from 'puppeteer';

// !!! Your local build must be running for this script to work
export async function screenshots() {
    const url = 'http://localhost:1234'; // local server url where your project is running
    const numberOfScreenshots = 50; // how many screenshots to take
    const animationDelay = 9999; // how long to wait for animation / reload to run in ms

    // log how long it will take
    console.log(`⌚ This will take roughly ${msToMinutes(numberOfScreenshots * animationDelay)} minutes to complete.`)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await page.setViewport({ width: 2000, height: 2000 });

    for (let i = 0; i < numberOfScreenshots; i++) {
    // const startTime = performance.now()
        const element = await page.$('#seed');
        const seed = await page.evaluate(el => el.textContent, element);
        // await page.waitForFunction(`document.getElementById('seed').innerText === 'reload'`, { timeout: 0 });
        await page.screenshot({
            path: `./screenshots/shot-${i}-${seed.split(': ').pop()}.jpg`,
            fullPage: true
        });
        await page.reload({ waitUntil: 'domcontentloaded' });
        // const endTime = performance.now()
        // const total = endTime - startTime;
        // const min = Math.floor((total/1000/60) << 0);
        // const sec = Math.floor((total/1000) % 60);
        // console.log(`⌚ ${min}:${sec} = ${i} screenshot taken`)
        console.log(`${i} : screenshot`);
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
