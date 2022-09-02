const { readFile, writeFile } = require('fs').promises;

const path = 'src/talker.json';

const readTalkers = async () => {
    const talkers = await readFile(path, 'utf-8');
    return JSON.parse(talkers);
};

const getAllTalkers = async () => {
    const data = await readTalkers();
    return data;
};

const createNewTalker = async ({ name, age, talk }) => {
    const data = await readTalkers();
    data.push({
        name,
        age,
        id: data[data.length - 1].id + 1,
        talk,
    });
    await writeFile(path, JSON.stringify(data));
    return data[data.length - 1];
};

module.exports = {
    readTalkers,
    getAllTalkers,
    createNewTalker,
};
