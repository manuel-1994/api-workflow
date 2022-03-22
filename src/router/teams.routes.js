const { Router } = require("express");
const { isRegular } = require("../middleware/authValidation");
const Teams = require("../services/teams.service");

const teams = (app)=>{
  const router = Router();
  const teamsService = new Teams();
  app.use('/teams',router)

  router.get('/',isRegular,async(req,res)=>{
    const result = await teamsService.getByUser(req.user.id)
    return res.status(result.success?200:400).json(result)
  })

  router.get('/:idTeam', isRegular, async(req,res)=>{
    const {idTeam} = req.params
    const result = await teamsService.get(idTeam);
    return res.status(200).json(result)
  })

  router.post('/',isRegular,async(req,res)=>{
    const {id} = req.user
    const result = await teamsService.create(id,req.body)
    return res.status(201).json(result)
  })

  router.delete('/:idTeam',isRegular,async(req,res)=>{
    const {idTeam} = req.params
    const result = await teamsService.delete(idTeam)
    return res.status(200).json(result)
  })

  router.post('/addMember',isRegular, async (req,res)=>{
    const {idTeam,idMember} = req.body;
    const result = await teamsService.addMember(idTeam, idMember);
    return res.status(200).json(result);
  })

  router.post('/changeRole', isRegular, async (req,res)=>{
    const {idTeam, idMember, role} = req.body;
    const result = await teamsService.changeRole(idTeam, idMember, role);
    return res.status(200).json(result);
  })

  router.post('/deleteMember', isRegular, async (req,res)=>{
    const {idTeam,idMember} = req.body;
    const result = await teamsService.deleteMember(idTeam, idMember);
    return res.status(200).json(result);
  })
}

module.exports = teams;