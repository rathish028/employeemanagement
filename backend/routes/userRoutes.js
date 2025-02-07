const express = require("express")
const router = express.Router()
const User = require("../models/users")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { verifyToken } = require("../middlewares/loginMiddleware")
const { validator } = require("../middlewares/validator")
const { validationResult } = require("express-validator")
const path = require("path")
const { loginvalidator } = require("../middlewares/loginvalidator")

router.get("/", (req, res, next) => {
    res.json({
        msg: "welcome to this website",
        data: null,
        err: null
    })
})

router.get("/users", verifyToken, (req, res, next) => {
    // console.log(req.headers, req.user, "user data")
    User.find().then((users) => {
        res.json({
            msg: "users retrived",
            data: users,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "users retrive failed",
            data: null,
            err: err
        })
    })
})

router.get("/user/:id", verifyToken, (req, res, next) => {
    const id = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : 0
    if (!id) {
        return res.json({
            msg: "invalid user id",
            data: null,
            err: "invalid user id"
        })
    }
    console.log(req.params.id)
    User.findOne({ _id: id }).then((result) => {
        if (!result) {
            return res.json({
                msg: "user not found",
                data: result,
                err: null
            })
        }
        res.json({
            msg: "user found",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "user not found",
            data: null,
            err: err
        })
    })
})

router.post("/create-user", validator, (req, res, next) => {
    console.log(req.body)
    const name = req.body.name
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            msg: "validation failed",
            data: null,
            err: errors.array()
        })
    }

    const newUser = new User({
        name,
        email,
        mobile,
        password
    })

    newUser.save().then((result) => {
        res.json({
            msg: "user created",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "user creation failed",
            data: null,
            err: err
        })
    })
})

router.put("/update-user", verifyToken, (req, res, next) => {
    const id = mongoose.Types.ObjectId.isValid(req.body.id) ? new mongoose.Types.ObjectId(req.body.id) : 0
    if (!id) {
        return res.json({
            msg: "invalid user id",
            data: null,
            err: "invalid user id"
        })
    }
    User.updateOne({ _id: id }, { $set: req.body }).then((result) => {
        res.json({
            msg: "user updated",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "user not updated",
            data: null,
            err: err
        })
    })
    console.log(req.body)
})

router.delete("/delete-user/:id", verifyToken, (req, res, next) => {
    const id = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : 0
    if (!id) {
        return res.json({
            msg: "invalid user id",
            data: null,
            err: "invalid user id"
        })
    }
    console.log(req.params.id)
    User.deleteOne({ _id: id }).then((result) => {
        if (result) {
            return res.json({
                msg: "user deleted",
                data: result,
                err: null
            })
        }
    }).catch((err) => {
        return res.json({
            msg: "user deletion failed",
            data: null,
            err: err
        })
    })
})

router.delete("/delete-users", verifyToken, (req, res, next) => {
    User.deleteMany().then((use) => {
        res.json({
            msg: "users deleted",
            data: use,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "users deletion failed",
            data: null,
            err: err
        })
    })
})

router.get("/signIn", (req, res, next) => {
    console.log(path.join(__dirname, "..", "templates", "templates.html"))
    res.sendFile(path.join(__dirname, "..", "templates", "templates.html"))
})

router.post("/signIn", loginvalidator, (req, res, next) => {
    const mobile = req.body.mobile
    const password = req.body.password
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            msg: "validation error",
            data: null,
            err: errors.array()
        })
    }
    User.findOne({ mobile: mobile, password: password }).then((result) => {
        if (!result) {
            return res.json({
                msg: "invalid login credentials",
                data: null,
                err: "invalid login credentials"
            })
        }
        const payload = JSON.stringify(result)
        const secretKey = process.env.JWT_SECRET_KEY
        console.log(result)
        const token = jwt.sign(payload, secretKey)
        res.json({
            msg: "login successfull",
            data: {
                token: token,
                user: result
            },
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "user not found",
            data: null,
            err: err
        })
    })
})

module.exports = router