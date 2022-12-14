const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = require('./app');
const { getAllTalkers, createNewTalker, editTalker, deleteTalker,
  searchTalker } = require('./services');
const emailValidation = require('./middlewares/emailValidation');
const passwordValidation = require('./middlewares/passwordValidation');
const tokenValidation = require('./middlewares/talkerValidations/tokenValidation');
const ageValidation = require('./middlewares/talkerValidations/ageValidation');
const nameValidation = require('./middlewares/talkerValidations/nameValidation');
const { talkValidation, watchedAtValidation,
  rateValidation } = require('./middlewares/talkerValidations/talkValidation');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_NO_CONTENT_STATUS = 204;
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

app.get('/talker/search', tokenValidation, async (request, response) => {
  const { q } = request.query;
  const searchResponse = await searchTalker(q);
  response.status(HTTP_OK_STATUS).json(searchResponse);
});

app.get('/talker/:id', async (request, response) => {
  const talkers = await getAllTalkers();
  const id = Number(request.params.id); 
  const talker = talkers.find((e) => e.id === id);
  if (talker) {
    return response.status(HTTP_OK_STATUS).json(talker);
  }
  return response.status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', emailValidation, passwordValidation, (_req, response) => {
  const token = randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', tokenValidation, nameValidation, ageValidation, talkValidation,
watchedAtValidation, rateValidation,
  async (request, response) => {
    const newTalker = await createNewTalker(request.body);
    response.status(HTTP_CREATED_STATUS)
      .json(newTalker);
});

app.put('/talker/:id', tokenValidation, nameValidation, ageValidation, talkValidation,
watchedAtValidation, rateValidation,
  async (request, response) => {
    const dataTalker = request.body;
    const { id } = request.params;
    const editedTalker = await editTalker(id, dataTalker);
    response.status(HTTP_OK_STATUS).json(editedTalker);
  });

  app.delete('/talker/:id', tokenValidation, async (request, response) => {
    const { id } = request.params;
    await deleteTalker(id);
    response.status(HTTP_NO_CONTENT_STATUS).end();
  });
