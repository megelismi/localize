import bcrypt from 'bcryptjs';

//Verfies that the user password matches the one in the database

const verifyPassword = (candidatePassword, salt, encryptedPassword) => {
  candidatePassword = bcrypt.hashSync(candidatePassword, salt)
  return candidatePassword === encryptedPassword; 
}

export default verifyPassword; 