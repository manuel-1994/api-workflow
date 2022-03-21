const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/environments");
const Users = require("./users.service");

class Auth{
  constructor () {
    this.usersService = new Users()
  }

  #getToken(user){
    const {data:{id,name,email,role}} = user
    const data = {
      id,
      name,
      email,
      role
    }
    const token = jwt.sign(data,jwt_secret,{expiresIn:'1d'})
    return {...user, data, token}
  }

  async #hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
  }

  async signIn(email, password){
    if(!email || !password) return {success: false, message:'Ingrese credenciales'}
   
    const user = await this.usersService.get({email});

    if(user.success){
      const successPassword = await bcrypt.compare(password,user.data.password)
      if(successPassword){
        return this.#getToken(user);
      }
      return {success:false, message:'Contraseña incorrecta'}
    }
    return {success:false, message:'Usuario no registrado'}
  }

  async signUp(data){
    const isUser = await this.usersService.get({email:data.email})
    if(isUser.success) return {success: false, message: 'El usuario ya existe'};
    if(data.password !== data.repeatPassword) return {success: false, message: 'Las contraseñas no coinciden'};

    delete data.role
    data.password = await this.#hashPassword(data.password);
    const user = await this.usersService.create(data);
    return this.#getToken(user);
  }

  async loginProvider(profile){
    let user = await this.usersService.get({email: profile.emails[0].value})
    if(user.success){
      if(!user.data.idProvider){
        user = await this.usersService.update(user.data.id,{
          provider: profile.provider,
          idProvider: profile.id
        })
      }
    }else{ 
      user = await this.usersService.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password:`${profile.name.givenName}${Math.round(Math.random()*99999)}`,
        provider: profile.provider,
        idProvider: profile.id
      })
    }
    return this.#getToken(user)
  }
}

module.exports = Auth;