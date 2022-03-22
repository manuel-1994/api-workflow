const { Router } = require("express");
const { isRegular } = require("../middleware/authValidation");
const { Users } = require("../services");

const users = (app) =>{
  const router = Router();
  const userService = new Users();
  app.use('/users', router);

  router.get('/', async(req,res)=>{
    const result = await userService.getAll(req.body)
    return res.json(result)
  })

  router.get('/profile', isRegular ,async (req,res)=>{
    const result = await userService.get({_id: req.user.id})
    return res.status(200).json(result)
  })

  router.put('/:id', async (req,res)=>{
    const {id} = req.params
    const result = await userService.update(id,req.body);
    return res.status(200).json(result);
  })
}

module.exports = users