const mongoose = require("mongoose")

const connection = require("./models/connection")
const User = require("./models/users")
const Ticket = require("./models/tickets")
const Event = require("./models/events")

Ticket.insertMany([{
    event: new mongoose.Types.ObjectId("67598c1b3028de54ccdec363"),
    price: 150,
    createdAt: new Date,
    updatedAt: new Date,
}]).then(()=>{
    console.log("tickets saved")
}).catch((err)=>{
    console.log("tickets not saved", err)
})

User.insertMany([{
    name: "prasanna",
    mobile: 9844365301,
    email: "hawkprasanna98@gmail.com",
    password: "prasanna@98",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    name: "dharun",
    mobile: 9844365301,
    email: "dharun1012@gmail.com",
    password: "dharun#01",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    name: "nithish",
    mobile: 9844365301,
    email: "nithish2347@gmail.com",
    password: "nithish@2345",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    name: "harish",
    mobile: 9844365301,
    email: "harishcr@gmail.com",
    password: "harish@2002",
    createdAt: new Date(),
    updatedAt: new Date()
},
]).then(()=>{
    console.log("users saved")
}).catch((err)=>{
    console.log("users not saved", err)
})


Event.insertMany([{
    type: "Rock-concert",
    location: "chennai",
    organiser: new mongoose.Types.ObjectId("67598c1b3028de54ccdec363"),
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    type: "karnatic Music",
    location: "banglore",
    organiser: new mongoose.Types.ObjectId("67598c1b3028de54ccdec363"),
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    type: "standup-comedy",
    location: "coimbatore",
    organiser: new mongoose.Types.ObjectId("67598c1b3028de54ccdec363"),
    createdAt: new Date(),
    updatedAt: new Date()
}]).then(()=>{
    console.log("events saved")
}).catch((err)=>{
    console.log("events not saved", err)
})

// process.exit()
