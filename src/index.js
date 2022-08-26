const bodyParser = require('body-parser');
const app = require('./app');
const talkers = require('./talker.json');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (_request, response) => (
  talkers.length > 0 ? response.status(HTTP_OK_STATUS).json(talkers) : []
));