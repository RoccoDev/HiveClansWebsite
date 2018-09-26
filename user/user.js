
const db = require('../dbmgr.js')



function find(obj, callback) {

    var key = obj.key
    var value = obj.value
    db.ref('users').orderByChild(key).equalTo(value).once("value", (snapshot) => callback(snapshot.val()))

}

function save(obj) {
    db.ref('users/' + obj._id).set(obj)
}

function get_promise(obj) {
    var key = obj.key
    var value = obj.value
    return db.ref('users').orderByChild(key).equalTo(value).once("value")


}

module.exports = {save, find, get_promise}