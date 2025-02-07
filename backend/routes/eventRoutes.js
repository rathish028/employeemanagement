const express = require("express")

const router = express.Router()
const Event = require("../models/events")
const { default: mongoose } = require("mongoose")
const { verifyToken } = require("../middlewares/loginMiddleware")

router.get("/events", verifyToken, (req, res, next) => {
    Event.find().then((result) => {
        res.json({
            msg: "events retrived",
            data: result,
            err: null
        })
    }).catch((err) => (
        res.json({
            msg: "retrive failed",
            data: null,
            err: err
        })
    ))
})

router.get("/events/:id", verifyToken, (req, res, next) => {
    const id = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : 0
    if (!id) {
        return res.json({
            msg: "invalid event id",
            data: null,
            err: "invalid event id"
        })
    }
    // console.log(req.params.id)
    Event.findOne({ _id: id }).then((result) => {
        if (!result) {
            return res.json({
                msg: "no event found",
                data: null,
                err: "no event found"
            })
        }
        res.json({
            msg: "event found",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "retrive failed",
            data: null,
            err: err
        })
    })
})

router.post("/create-event", verifyToken, (req, res, next) => {
    const name = req.body.name
    const type = req.body.type
    const location = req.body.location
    const description = req.body.description
    const dateAndTime = req.body.dateAndTime
    console.log(req.user, "from create event")
    const organiser = mongoose.Types.ObjectId.isValid(req.user._id) ? new mongoose.Types.ObjectId(req.user._id) : 0
    if (!organiser) {
        return res.json({
            msg: "invalid organiser id",
            data: null,
            err: "invalid organiser id"
        })
    }
    const newEvent = new Event({
        name,
        type,
        location,
        organiser,
        description,
        dateAndTime
    })
    newEvent.save().then((result) => {
        console.log(result, "new event")
        res.json({
            msg: "event created",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "event creation failed",
            data: null,
            err: err
        })
    })

})

router.put("/update-event", verifyToken, (req, res, next) => {
    const id = mongoose.Types.ObjectId.isValid(req.body._id) ? new mongoose.Types.ObjectId(req.body._id) : 0
    if (!id) {
        return res.json({
            msg: "invalid event  id",
            data: null,
            err: "invalid event id"
        })
    }
    Event.updateOne({ _id: id }, { $set: req.body }).then((result) => {
        res.json({
            msg: "event updated",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "event not updated",
            data: null,
            err: err
        })
    })
    console.log(req.body)
})


router.delete("/delete-event/:id", verifyToken, (req, res, next) => {
    const id = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : 0
    if (!id) {
        return res.json({
            msg: "invalid event id",
            data: null,
            err: "invalid event id"
        })
    }
    console.log(id)
    Event.deleteOne({ _id: id }).then((result) => {
        if (result) {
            return res.json({
                msg: "event deleted",
                data: result,
                err: null
            })
        } else {
            return res.json({
                msg: "event not found",
                data: null,
                err: "event not found"
            })
        }
    }).catch((err) => {
        return res.json({
            msg: "event deletion failed",
            data: null,
            err: err
        })
    })
})

router.delete("/delete-events", verifyToken, (req, res, next) => {
    Event.deleteMany().then((result) => {
        return res.json({
            msg: "event deleted",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "event deletion failed",
            data: null,
            err: err
        })
    })
})



module.exports = router