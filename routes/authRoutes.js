const passport = require("passport");
const {clientSideURL}=require('../config/keys');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>{
        res.redirect(clientSideURL+'/surveys');
    });
    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    });
    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect(clientSideURL+'/');
    });
    
    app.get('/auth/facebook',passport.authenticate('facebook',{scope:['public_profile','email']}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'));
};
