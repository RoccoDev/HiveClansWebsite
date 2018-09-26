const flake = require('shortid');


function gen() {
    return flake.generate()
}

module.exports = {gen}