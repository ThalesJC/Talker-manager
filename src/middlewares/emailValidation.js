const emailValidation = (req, res, next) => {
    const { email } = req.body;
    const validEmail = /[\w]+@[\w]+\.[\w]{3}/;
    const STATUS_CODE = 400;
    if (!email) {
        return res.status(STATUS_CODE)
          .json({ message: 'O campo "email" é obrigatório' });
    }
    if (!validEmail.test(email)) {
        return res.status(STATUS_CODE)
          .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

module.exports = emailValidation;