const db = require('../dbmgr.js')

function find(obj, callback) {

    var key = obj.key
    var value = obj.value

    db.ref('clans').orderByChild(key).equalTo(value).once("value", (snapshot) => callback(snapshot.val()))

}

function get(key, callback) {
    db.ref('clans/' + key).once("value", (snapshot) => callback(snapshot.val()))
}

function save(obj) {
    db.ref('clans/' + obj._id).set(obj)
}

function list(callback) {
    db.ref('clans').once("value", (snapshot) => callback(snapshot.val()))
}

function remove(clan) {
    db.ref('clans/' + clan).remove()
}

function removeMember(clan, member) {
    db.ref('clans/' + clan + '/members/' + member).remove()
}

function findStarts(obj, callback) {
    var key = obj.key
    var value = obj.value

    db.ref('clans').orderByChild(key).startAt(value).endAt(value + "\uf8ff").once("value", (snapshot) => callback(snapshot.val()))

}

function removeField(clan, field) {
    db.ref('clans/' + clan + '/' + field).remove()
}

function findForUser(id, callback) {

    db.ref('clans').orderByChild('members/' + id + '/id').equalTo(id).once("value", (snapshot) => callback(snapshot.val()))
}

module.exports = {save, find, get, list, findStarts, findForUser, remove, removeMember, removeField}