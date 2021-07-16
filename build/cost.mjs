/* eslint-disable no-console */
import getFolderSize from 'get-folder-size';


async function checkCost() {
    const myFolder = 'distZip.zip';
    const size = await getFolderSize.loose(myFolder);
    console.log(`The project is ${size} bytes large`);
    console.log(`Cost: ${675 * size * 10 * (1 / 1000000000)}Eth at 10Gwei`);
    console.log(`Cost: ${675 * size * 50 * (1 / 1000000000)}Eth at 50Gwei`);
    console.log(`Cost: ${675 * size * 100 * (1 / 1000000000)}Eth at 100Gwei`);
    console.log(`Cost: ${675 * size * 150 * (1 / 1000000000)}Eth at 150Gwei`);
    console.log(`Cost: ${675 * size * 200 * (1 / 1000000000)}Eth at 200Gwei`);
}

checkCost();