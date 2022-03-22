const {TeamsModel} = require('../models');

class Teams{

  async create(idLeader,data){
    const saveData = await TeamsModel.create({...data, idLeader, members:[{_id:idLeader,role:"leader"}]});
    return {success: true, message:'Equipo de trabajo creado exitosamente', data: saveData}
  }

  async getByUser(idUser){
    const teams = await TeamsModel.find({members:{$elemMatch:{_id:idUser}}});
  
    if (teams.length>0){
      return {success:true, data:teams}
    }
    return {success:false, message:'No tiene equipos de trabajos creados'}
  }

  async get(idTeam){
     return await TeamsModel.findOne({_id:idTeam}).populate("members._id", 'name email');
  }

  async update(idTeam,data){
    const {name, description} = data;
    const updateData = await TeamsModel.findByIdAndUpdate(idTeam, {name,description},{new:true});
    return {success:true, message: 'Equipo de trabajo actualizado exitosamente', data: updateData}
  }

  async delete(idTeam){
    const deleteData = await TeamsModel.findByIdAndDelete(idTeam);
    return {success:true, message: 'Equipo de trabajo eliminado exitosamente', data:deleteData}
  }

  async addMember(idTeam, idMember){
    const updateData = await TeamsModel.findByIdAndUpdate(idTeam, {$push:{members:{_id:idMember}}},{new:true})
    return updateData
  }

  async changeRole(idTeam, idMember, newRole){
    const updateData = await TeamsModel.findByIdAndUpdate(idTeam, {$set:{'members.$[el].role':newRole}},{arrayFilters:[{'el._id':idMember}], new:true})
    return updateData
  }

  async deleteMember(idTeam, idMember){
    const deleteData = await TeamsModel.findByIdAndUpdate(idTeam, {$pull:{members:{_id:idMember}}})
    return deleteData
  }
}

module.exports = Teams