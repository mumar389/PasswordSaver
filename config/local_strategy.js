const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//Passport use
passport.use(new LocalStrategy({
    usernameField:"email"
},
   async function(username,password,done){
       let user=await User.findOne({username:username})
            // if(err){
            //     console.log("Error in passport-local--->");
            //     return done(err);
            // }
            if(!user||user.password!=password){
                console.log("Invalid Credentials");
                return done(null,false);
            }
            console.log("User Found");
            return done(null,user);
        
    }
));

//serialize user
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
//check Auth
passport.checkAuth=function(req,res,next){
    // if(req.isAuthenticated()){
    // }
    return next();
    // else{
    //     console.log("User not signed in");
    //     return res.redirect('/users/sign-in');
    // }
}
//setAuth
// passport.setAuthenticatedUser=function(req,res,next){
//     if(req.isAuthenticated()){
//         res.locals.user=req.user;
//     }
//     next();
// }

module.exports=passport;