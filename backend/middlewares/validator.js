const { check } = require("express-validator");

exports.validator = [
    check("name").not().isEmpty().withMessage("name must be a filled out"),
    check("mobile").not().isEmpty().withMessage("mobile must be a filled out"),
    check("mobile").isNumeric().withMessage("mobile must be a number"),
    check("mobile").isLength({min: 10, max: 10}).withMessage("mobile must be a length of 10"),
    // check("password").not().isEmpty().isStrongPassword().withMessage("password must be filled out"),
    check("email").isEmail().withMessage("Enter a valid e-mail id"),
    // check("confirm_password").not().isEmpty().withMessage("password must be filled out").not().matches("password").withMessage("password must match")
]