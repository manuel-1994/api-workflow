const {UsersModel} = require("../models");

class Users{
  async create(data){
    const saveData = await UsersModel.create(data);
    return {success: true, message:'Usuario creado exitosamente', data: saveData}
  }

  async getAll(filter){
    const data = await UsersModel.find(filter);
    if(data.length>0){
      return {success:true, data}
    }
    return {success:false, message: 'Usuario no encontrado'}
  }

  async get(filter){
    const data = await UsersModel.findOne(filter);
    if(!data){
      return {success:false, message: 'Usuario no encontrado'}
    }
    return {success:true, data}
  }

  async update(id,data){
    const updateData = await UsersModel.findByIdAndUpdate(id, data,{new:true});
    return {success:true, message: 'Usuario actualizado exitosamente', data: updateData}
  }

  async delete(id){
    const deleteData = await UsersModel.findByIdAndDelete(id);
    return {success:true, meesage: 'Usuario eliminado exitosamente', data:deleteData}
  }
}

module.exports = Users;