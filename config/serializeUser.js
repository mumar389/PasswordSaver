const passport=require('passport')
const User=require('../models/user');
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserial
passport.deserializeUser(async function(id,done){
let users=await User.findById(id)
    if(!users){
        console.log("Error in passport deserial");
        return done(err);
    }
    return done(null,users);

});
module.exports=passport