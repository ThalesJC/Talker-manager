const HTTP_BAD_REQUEST_STATUS = 400;

const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

const watchedAtValidation = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dateFormat = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
    if (!watchedAt) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "watchedAt" é obrigatório' });
    } if (!dateFormat.test(watchedAt)) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const rateValidation = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate === undefined) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "rate" é obrigatório' });
    } if (rate < 1 || rate > 5) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = {
    talkValidation,
    watchedAtValidation,
    rateValidation,
};