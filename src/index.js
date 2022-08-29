const bodyParser = require('body-parser');
const app = require('./app');
const { getAllTalkers } = require('./services');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Voce esta na rota raiz');
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_request, response) => {
    const talkers = await getAllTalkers();
    return talkers ? response.status(HTTP_OK_STATUS).json(talkers) : [];
});

app.get('/talker/:id', async (request, response) => {
  const talkers = await getAllTalkers();
  const id = Number(request.params.id); 
  const talker = talkers.find((e) => e.id === id);
  console.log(talker);
  response.status(HTTP_OK_STATUS).json(talker);
});

// app.post('/login', () => {

// });