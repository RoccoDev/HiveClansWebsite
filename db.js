module.exports = {
    secret: process.env.SECRET,
    database: process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME
}