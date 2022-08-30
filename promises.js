const fsPromises = require('fs').promises
const path = require('path')

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promisesWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promisesWrite.txt'), '\n\nIt worked!');
        await fsPromises.rename(path.join(__dirname, 'files', 'promisesWrite.txt'), path.join(__dirname, 'files', 'promises.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promises.txt'), 'utf-8');
        console.log(newData);
        // await fsPromises.unlink(path.join(__dirname, 'files', 'promisesWrite.txt'));
    } catch (error) {
        console.log(error);
    }
}

fileOps();