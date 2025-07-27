const tokenValidation = (req, res, next) => {
    const token = req.header('authorization');
    const regToken = /\w{16}/;
    const HTTP_UNAUTHORIZED_STATUS = 401;
    if (!token) {
        return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
    } if (!regToken.test(token)) {
        return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
    } next();
};

module.exports = tokenValidation;