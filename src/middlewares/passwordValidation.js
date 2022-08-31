const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    const validPassword = /\w{6,}/;
    const STATUS_CODE = 400;

    if (!password) {
        return res.status(STATUS_CODE)
          .json({ message: 'O campo "password" é obrigatório' });
    }
    if (!validPassword.test(password)) {
       return res.status(STATUS_CODE)
         .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = passwordValidation;
