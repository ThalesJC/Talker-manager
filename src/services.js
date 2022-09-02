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
    await writeFile(path, JSON.stringify(data), 'utf-8');
    return data[data.length - 1];
};

const editTalker = async (id, { name, age, talk }) => {
    const data = await readTalkers();
    const editedTalker = data.find((talker) => talker.id === Number(id));
    editedTalker.name = name;
    editedTalker.age = age;
    editedTalker.talk = talk;
    await writeFile(path, JSON.stringify(data), 'utf-8');
    return editedTalker;
};

const deleteTalker = async (id) => {
    const data = await readTalkers();
    const filteredData = data.filter((talker) => talker.id !== Number(id));
    await writeFile(path, JSON.stringify(filteredData), 'utf-8');
    console.log(filteredData);
};

module.exports = {
    readTalkers,
    getAllTalkers,
    createNewTalker,
    editTalker,
    deleteTalker,
};
