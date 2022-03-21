const UsersModel = require("../models/user");

class Users{
  async create(data){
    const saveData = await UsersModel.create(data);
    return {success: true, message:'Usuario creado exitosamente', data: saveData}
  }

  async getall(){
    return await UsersModel.find();
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