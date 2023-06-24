const express=require('express');
const router=express.Router();
const homeControl=require('../controller/home_control')
// router.get('/',homeControl.Home)
router.use('/user',require('./user'))


module.exports=router;