const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { use } = require('../routes/auth');
const { generateJwt } = require('../helpers/jwt'); 

// Create User
const createUser = async(req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({email});
    
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo'
      });
    }

    user = new User(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJwt(user.id, user.name);
  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
    
  } catch(error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

// Login User
const loginUser = async(req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email'
      });
    }

    // Confirm Password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password Incorrecto'
      }) 
    }

    // Generate Json Web Token
    const token = await generateJwt(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

// Revalidate Token
const revalidateToken = async (req, res = response) => {

  const {uid, name} = req;

  // Generate JWT
  const token = await generateJwt(uid, name);

  res.json({
    ok: true,
    token
  });
}

module.exports = {
  createUser,
  loginUser,
  revalidateToken
}