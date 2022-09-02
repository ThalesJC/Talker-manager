const HTTP_BAD_REQUEST_STATUS = 400;

const talkFunction = (res, talk) => {
    if (!talk) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "talk" é obrigatório' });
    }
};

const watchedAtFunction = (res, watchedAt) => {
    const dateFormat = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
    if (!watchedAt) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "watchedAt" é obrigatório' });
    } if (!dateFormat.test(watchedAt)) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
};

const rateFunction = (res, rate) => {
    if (!rate) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "rate" é obrigatório' });
    } if (rate < 1 || rate > 5) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
};

const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    
    talkFunction(res, talk);
    watchedAtFunction(res, talk.watchedAt);
    rateFunction(res, talk.rate);
    next();
};

module.exports = talkValidation;