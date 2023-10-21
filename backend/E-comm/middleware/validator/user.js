const {check, validationResult}=require('express-validator');


exports.ValidateUserSignUp=[
    check('fullname').trim().not().isEmpty().withMessage('Name is required').isString().isLength({min:4, max:20}).withMessage('Enter Full Name'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
    check('Phone').trim().not().isMobilePhone().withMessage('Enter Phone num'),
    check('cnic').trim().not().isEmpty().withMessage('Enter ID-card num'),
    check('password').trim().not().isEmpty().withMessage('password is Empty').isLength({min:8,max:20}).withMessage('Enter password'),
    check('cnf_pass').trim().not().isEmpty().custom((value,{req})=>{
        if(value!==req.body.password){
            throw new   Error('Both Password must be same')
        }
        return true;
    })
]

exports.userValidation=(req,res,next)=>{
        const result= validationResult(req).array();
        if(!result.length)return next();

        const error=result[0].msg;
        res.json({success: false, message:error  });

};
exports.ValidateUserSignIn=[
    check('emial').trim().isEmail().withMessage('email is required'),
    check('password').trim().not().isEmpty().withMessage('password is required'),
];