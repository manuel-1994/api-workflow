const { Router } = require("express");
const passport = require('passport');
const tokenToCookie = require("../helpers/tokenToCookie");
const { isRegular } = require("../middleware/authValidation");
const { useGoogleStrategy } = require("../middleware/providerValidation");
const { Auth } = require("../services")

const auth = (app) =>{
  const router = Router();
  const authService = new Auth();
  app.use('/auth', router)

  passport.use(useGoogleStrategy());

  passport.serializeUser((user,done)=>{
    done(null,user)
})

  router.post('/signin', async (req,res)=>{
    const {email,password} = req.body
    const result = await authService.signIn(email,password);
     tokenToCookie(res,result)
  })

  router.post('/signup', async (req,res)=>{
    const result = await authService.signUp(req.body);
    return tokenToCookie(res,result)
  })

  router.get('/signout', async (req,res)=>{
    return res.cookie('token', '', {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date()
    }).json({loggedOut:true})
  })

  router.get('/validate', isRegular, async (req,res)=>{
    return res.json({logged:true, user:req.user})
  })

  /* google auth */

  router.get('/google', passport.authenticate('google', {
    scope:['email','profile']
  }))

  router.get('/google/callback', passport.authenticate('google'), async (req,res)=>{
    const result = await authService.loginProvider(req.user.profile)
    return tokenToCookie(res,result);
  })
}

module.exports = auth