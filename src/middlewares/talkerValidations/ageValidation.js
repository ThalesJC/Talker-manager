const ageValidation = (req, res, next) => {
    const { age } = req.body;
    const HTTP_BAD_REQUEST_STATUS = 400;
    const MAXIMUM_AGE_ALLOW = 18;

    if (!age) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "age" é obrigatório' });
    } if (age < MAXIMUM_AGE_ALLOW) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    } next();
};

module.exports = ageValidation;
