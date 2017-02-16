const userNameAndPasswordArePresent = (req) => {

  if (!req.body) {
    return {
      isInvalid: true, 
      status: 400,
      message: "Request body is missing"
    }
  }

  if (!('username' in req.body)) {
   return {
      isInvalid: true,
      status: 422, 
      message: "Missing field: username"
    }
  }

  let {username, password, first_name, last_name, email} = req.body;
  
  if (typeof username !== 'string') {
    return {
      isInvalid: true, 
      status: 422, 
      message: "Incorrect field type: username"
    }
  }

  username = username.trim();

  if (username === '') {
    return {
      isInvalid: true,
      status: 422, 
      message: "Incorrect field length: username"
    }
  }

  if (!(password)) {
    return {
      isInvalid: true,
      status: 422, 
      message: "Incorrect field length: username"
    }
  }

  if (typeof password !== 'string') {
    return {
      isInvalid: true,
      status: 422, 
      message: "Incorrect field type: password'"
    }
  }
  
  password = password.trim();

  if (password === '') {
    return {
      isInvalid: true, 
      status: 422, 
      message: 'Incorrect field length: password'
    }
  }

  email = email.trim();

  if (typeof email !== 'string') {
    return {
      isInvalid: true, 
      status: 422, 
      message: "Incorrect field type: email"
    }
  }

  if (email === '') {
    return {
      isInvalid: true, 
      status: 422, 
      message: 'Incorrect field length: email'
    }
  }
  
  return {
    isInvalid: false
  }
}

export default userNameAndPasswordArePresent;


