const jwt = require("jsonwebtoken");
const APP_SECRET = process.env["APP_SECRET"];

function getUserId(context) {
    const Authorization = context.request.get("Authorization");
    if (Authorization) {
        const token = Authorization.replace("=", "");
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }

    throw Error("Not authenticated");
}

module.exports = {
    getUserId
};