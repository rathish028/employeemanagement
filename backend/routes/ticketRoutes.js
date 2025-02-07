const express = require("express")


const router = express.Router()
const Ticket = require("../models/tickets")
const mongoose = require("mongoose")
const { verifyToken } = require("../middlewares/loginMiddleware")

router.get("/tickets", verifyToken, (req, res, next) => {
    Ticket.find().then((result) => {
        res.json({
            msg: "tickets retrived",
            data: result,
            err: null
        })
    }).catch((err) => (
        res.json({
            msg: "tickets retrive failed",
            data: null,
            err: err
        })
    ))
})

router.get("/ticket/:id", verifyToken, (req, res, next) => {
    const id = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : 0
    if (!id) {
        return res.json({
            msg: "invalid event id",
            data: null,
            err: "invalid event id"
        })
    }
    console.log(req.params.id)
    Ticket.findOne({ _id: id }).then((result) => {
        if (!result) {
            return res.json({
                msg: "ticket not found",
                data: null,
                err: "ticket not found"
            })
        }
        res.json({
            msg: "ticket found",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "ticket not found",
            data: null,
            err: err
        })
    })
})

router.post("/create-ticket", verifyToken, (req, res, next) => {
    const event = mongoose.Types.ObjectId.isValid(req.body.event) ? new mongoose.Types.ObjectId(req.body.event) : 0
    const user = mongoose.Types.ObjectId.isValid(req.body.user) ? new mongoose.Types.ObjectId(req.body.user) : 0
    if (!event) {
        return res.json({
            msg: "invalid event id",
            data: null,
            err: "invalid event id"
        })
    }
    // const price = req.body.price

    const newTicket = new Ticket({
        event,
        user
    })

    newTicket.save().then((result) => {
        res.json({
            msg: "ticket created",
            data: result,
            err: null
        })
    }).catch((err) => {
        res.json({
            msg: "ticket creation failed",
            data: null,
            err: err
        })
    })
})

// router.put("/update-ticket", verifyToken, (req, res, next) => {
//     const id = mongoose.Types.ObjectId.isValid(req.body.id) ? new mongoose.Types.ObjectId(req.body.id) : 0
//     if (!id) {
//         return res.json({
//             msg: "invalid event id",
//             data: null,
//             err: "invalid event id"
//         })
//     }
//     Ticket.updateOne({ _id: id }, { $set: req.body }).then((result) => {
//         res.json({
//             msg: "ticket updated",
//             data: result,
//             err: null
//         })
//     }).catch((err) => {
//         res.json({
//             msg: "ticket not updated",
//             data: null,
//             err: err
//         })
//     })
//     console.log(req.body)
// })

// router.delete("/delete-ticket/:id", verifyToken, (req, res, next) => {
//     const id = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id):0
//     if (!id) {
//         return res.json({
//             msg: "invalid ticket id",
//             data: null,
//             err: "invalid ticket id"
//         })
//     }
//     console.log(req.params.id)
//     Ticket.deleteOne({_id:id}).then((result) => {
//         if (result) {
//             return res.json({
//                 msg: "ticket deleted",
//                 data: result,
//                 err: null
//             })
//         }
//     }).catch((err) => {
//         return res.json({
//             msg: "ticket deletion failed",
//             data: null,
//             err: err
//         })
//     })
// })

// router.delete("/delete-tickets", verifyToken, (req, res, next) => {
//     Ticket.deleteMany().then((result) => {
//         res.json({
//             msg: "tickets deleted",
//             data: result,
//             err: null
//         })
//     }).catch((err) => {
//         res.json({
//             msg: "tickets deletion failed",
//             data: null,
//             err: err
//         })
//     })
// })
module.exports = router