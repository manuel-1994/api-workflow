const {BoardsModel,TeamsModel } = require("../models");


class Boards{
  async create(idTeam,data){
    const team = await TeamsModel.findById(idTeam)

    if(team){
      const saveData = await BoardsModel.create(data)
      await team.updateOne({$push:{boards:{_id:saveData._id}}})
      return {success: true, data: saveData}
    } 
    return {success: false, message: "No se pudo crear el tablero porque el equipo de trabajo no se encuentra disponible"}
  }

  async update(idBoard, data){
    const updateData = await BoardsModel.findByIdAndUpdate(idBoard,data, {new:true})
    return {success: true, message: "Tablero actualizado", data: updateData}
  }

  async delete(idTeam, idBoard){
    await TeamsModel.findByIdAndUpdate(idTeam, {$pull:{boards:{_id:idBoard}}})
    const deleteData = await BoardsModel.findByIdAndDelete(idBoard)
    return {success: true, data:deleteData}
  }
}

module.exports = Boards