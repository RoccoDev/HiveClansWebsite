const express = require('express');
const router = express.Router();
const Clan = require('../../../clan/clan.js')
const storage = require('../../../storagemgr.js')
var Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');


router.use(require('../../user/middleware.js'))



router.post('/bannerlarge', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    const busboy = new Busboy({ headers: req.headers });
    const tmpdir = os.tmpdir();


    const uploads = {}
    var fileWrites = [];

    busboy.on('file', (fieldname, file, filename) => {
        const filepath = path.join(tmpdir, Date.now() + filename)
        uploads[fieldname] = filepath;

        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
                writeStream.end();
            });
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
        fileWrites.push(promise);
    });

    busboy.on('finish', () => {
        Promise.all(fileWrites)
            .then(() => {
                for (const name in uploads) {
                    const file = uploads[name];
                    storage.bucket().upload(file, {destination: 'clan/' + req.clan._id + '/banner-large'})
                        .then(() => {
                            fs.unlinkSync(file);
                            req.clan.bannerLarge = true
                            Clan.save(req.clan)
                            res.sendStatus(200)
                        })

                }
            });
    });

    busboy.end(req.rawBody)


});

router.post('/bannersmall', (req, res) => {
    var clan = req.clan
    var user = req.user
    if(clan.owner.id !== user._id) {
        res.sendStatus(403)
        return;
    }
    const busboy = new Busboy({ headers: req.headers });
    const tmpdir = os.tmpdir();


    const uploads = {}
    var fileWrites = [];

    busboy.on('file', (fieldname, file, filename) => {
        const filepath = path.join(tmpdir, Date.now() + filename)
        uploads[fieldname] = filepath;

        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
                writeStream.end();
            });
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
        fileWrites.push(promise);
    });

    busboy.on('finish', () => {
        Promise.all(fileWrites)
            .then(() => {
                for (const name in uploads) {
                    const file = uploads[name];
                    storage.bucket().upload(file, {destination: 'clan/' + req.clan._id + '/banner-small'})
                        .then(() => {
                            fs.unlinkSync(file);
                            req.clan.bannerSmall = true
                            Clan.save(req.clan)
                            res.sendStatus(200)
                        })

                }
            });
    });

    busboy.end(req.rawBody)


});



module.exports = router