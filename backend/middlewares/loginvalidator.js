const { check } = require ("express-validator")

exports.loginvalidator = [ 
    check("mobile").not().isEmpty().withMessage("please fill "),
    check("mobile").isNumeric().withMessage("mobile must be a filled out"),
    check("mobile").isLength({min: 10, max: 10}).withMessage("mobile must be a length of 10"),
    check("password").not().isEmpty().withMessage("password must be filled out"),
]
