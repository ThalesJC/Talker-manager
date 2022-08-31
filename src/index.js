const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = require('./app');
const { getAllTalkers } = require('./services');
const emailValidation = require('./middlewares/emailValidation');
const passwordValidation = require('./middlewares/passwordValidation');
const tokenValidation = require('./middlewares/talkerValidations/tokenValidation');
const talkValidation = require('./middlewares/talkerValidations/talkValidation');
const ageValidation = require('./middlewares/talkerValidations/ageValidation');
const nameValidation = require('./middlewares/talkerValidations/nameValidation');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
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
  (_request, response) => {
    response.status(HTTP_CREATED_STATUS)
      .json({ message: 'Pessoa palestrante criada com sucesso!' });
});
