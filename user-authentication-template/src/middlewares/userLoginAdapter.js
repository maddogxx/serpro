const { UserController } = require("../controllers/UserController");
const { comparePassword } = require("../services/encryptPassword");

async function userLoginAdapter(req, res, next) {
    const { email } = req.params;
    const { password } = req.body;

    if (!email && !password) return res.status(400).end();

    const usuarioConsultado = await UserController.findByEmail(email);

    if (!usuarioConsultado) return res.status(400).end();

    const { dataValues } = usuarioConsultado;

    const usuarioValido = await comparePassword(password, dataValues.password);
    
    if (usuarioValido) {
        req.user = {...dataValues };
    } else {
        return res.status(400).end();
    }

    next();
};

module.exports = { userLoginAdapter };
