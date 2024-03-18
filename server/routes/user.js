const express = require("express");
const router = express.Router();
const {User} = require("../models/User.js");

//--Users Endpoints (CRUD)--

// Read User by Username (GET)
router.get('/users/readUser', async (req, res) => {
    const user = User.findOne({
        username: req.body.username
    })
    await user.exec()
        .then((query) => {
            console.log(query);
            res.json({message: query});
        })
        .catch((e) => {
            console.log(`Could not findOne : ${e}`);
            res.json({message: `Could not findOne : ${e}`});
        });
})

// Read User by ID (GET)
router.get('/users/readUser/:id', async (req, res) => {
    const user = User.findOne({
        _id : req.params.id
    })
    await user.exec()
        .then((query) => {
            console.log(query);
            res.json({message: query});
        })
        .catch((e) => {
            console.log(`Could not findOne : ${e}`);
            res.json({message: `Could not findOne : ${e}`});
        });
})

// Create Users (POST)
router.post('/users/createUser', async (req, res) => {
    // Create User Object
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        createdAt: new Date()
    })
    await user.save()
        .then((resp) => {
            console.log(resp);
            res.json({message: resp});
        })
        .catch((e) => {
            console.log(`Could not create : ${e}`);
            res.json({message: `Could not create : ${e}`});
        });
})

// Update User by Username (PUT)
router.put("/users/updateUser", async (req, res) => {
    const user = User.findOneAndUpdate({
            username: req.body.username
        },
        {
            $set: {
                username: req.body.username,
                password: req.body.password,
                updatedAt: new Date()
            }
        },
        {
            upsert: true
        },
    )
    await user.exec()
        .then((update) => {
            console.log(update);
            res.json({message: update});
        })
        .catch((e) => {
            console.log(`Could not findOneAndUpdate : ${e}`);
            res.json({message: `Could not findOneAndUpdate : ${e}`});
        });
});

// Update User by ID (PUT)
router.put("/users/updateUser/:id", async (req, res) => {
    const user = User.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            $set: {
                username: req.body.username,
                password: req.body.password,
                updatedAt: new Date()
            }
        },
        {
            upsert: true
        },
    )
    await user.exec()
        .then((update) => {
            console.log(update);
            res.json({message: update});
        })
        .catch((e) => {
            console.log(`Could not findByIdAndUpdate : ${e}`);
            res.json({message: `Could not findByIdAndUpdate : ${e}`});
        });
});

// Delete User by Username (DELETE)
router.delete('/users/deleteUser/', async (req, res) => {
    const user = User.findOneAndDelete({
            username: req.body.username
        }
    )
    await user.exec()
        .then(query => {
            res.json(query);
        })
        .catch(err => {
            console.error(err)
        });
})

// Delete User by ID (DELETE)
router.delete('/users/deleteUser/:id', async (req, res) => {
    const user = User.findByIdAndDelete({
            _id: req.params.id
        }
    )
    await user.exec()
        .then(query => {
            res.json(query);
        })
        .catch(err => {
            console.error(err)
        });
})

module.exports = router;