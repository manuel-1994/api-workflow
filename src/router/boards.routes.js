const { Router } = require("express");
const {Boards} = require("../services");
const {isRegular} = require('../middleware/authValidation')

const boards = (app) =>{
  const router = Router();
  const boardsService = new Boards();
  app.use('/boards', router);

  router.post('/',isRegular, async (req, res)=>{
    const {      
      idTeam,
      title,
      description,
      background
    } = req.body
    const result = await boardsService.create( idTeam ,{title,description,background});
    return res.status(201).json(result);
  })

  router.put('/', isRegular, async (req,res)=>{
    const {
      idBoard,
      title,
      description,
      background} = req.body
    const result = await boardsService.update(idBoard, {title,description,background})
    return res.status(200).json(result)
  })

  router.delete('/',isRegular, async (req,res)=>{
    const {idTeam, idBoard} = req.body
    const result = await boardsService.delete(idTeam,idBoard)
    return res.status(200).json(result)
  })
}

module.exports = boards;