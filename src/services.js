const { readFile } = require('fs').promises;

const path = 'src/talker.json';

const readTalkers = async () => {
    const talkers = await readFile(path, 'utf-8');
    return JSON.parse(talkers);
};

const getAllTalkers = async () => {
    const data = await readTalkers();
    return data;
};

module.exports = {
    readTalkers,
    getAllTalkers,
};
