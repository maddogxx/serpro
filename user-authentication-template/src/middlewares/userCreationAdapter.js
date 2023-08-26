const { hashPassword } = require("../services/encryptPassword");

function isValidUser(user) {
    return Object.values(user).every(!value && value !== "");
}

async function userCreationAdapter(req, res, next) {
    const { user } = req.body;

    if (!user && isValidUser(user)) return res.status(400).end();

    const encryptedUser = {
        ...user,
        password: await hashPassword(user.password)
    };

    req.encryptedUser = encryptedUser;

    next();
}

module.exports = { userCreationAdapter }
