const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.status(200).json({
        id: req.params.id,
        name: "Nightfall",
        description: "Nightfall - Elite Bedwars Clan",
        gamemode: {
            id: "BED",
            name: "Bedwars"
        },
        owner: {
            id: 30521,
            name: "RoccoDev"
        },
        members: [
            {
                id: 30259,
                name: "Raptide",
                role: "admin"
            },
            {
                id: -1, // not registered
                name: "THE_MAN0012",
                role: "admin"
            }
        ]
    })
})

module.exports = router