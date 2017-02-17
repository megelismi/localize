const validEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const allFormFieldsFilledIn = request => {
 for (let field in request) {
   if (request[field] === '') {
     return false; 
   }
 }
 return true; 
};

const signUpValidity = (req) => {
  console.log(req.body)
  let { username, password, first_name, last_name, email, confirmed_password } = req.body;
  first_name = first_name.trim(); 
  last_name = last_name.trim();
  username = username.trim();
  password = password.trim();
  confirmed_password = confirmed_password.trim(); 
  email = email.trim();

  if (!req.body) {
    return {
      isInvalid: true, 
      status: 400,
      message: "Request body is missing."
    }
  }

  if (!allFormFieldsFilledIn(req.body)) {
     return {
      isInvalid: true, 
      status: 422,
      message: "All fields are required before form can be submitted."
    }
  }

  if (!('first_name' in req.body)) {
   return {
      isInvalid: true,
      status: 422, 
      message: "Missing field: First name"
    }
  }

  if (typeof first_name !== 'string') {
    return {
      isInvalid: true, 
      status: 422, 
      message: "Incorrect field type: First name"
    }
  }

  if (first_name === '') {
     return {
      isInvalid: true,
      status: 422, 
      message: "First name is required."
    }
  }

    if (!('last_name' in req.body)) {
   return {
      isInvalid: true,
      status: 422, 
      message: "Missing field: Last name"
    }
  }

  if (typeof last_name !== 'string') {
    return {
      isInvalid: true, 
      status: 422, 
      message: "Incorrect field type: Last name"
    }
  }

  if (last_name === '') {
    return {
      isInvalid: true,
      status: 422, 
      message: "Last name is required."
    }
  }


  if (typeof email !== 'string') {
    return {
      isInvalid: true, 
      status: 422, 
      message: "An email address is required."
    }
  }

  if (email === '') {
    return {
      isInvalid: true, 
      status: 422, 
      message: 'An email address is required.'
    }
  }

  if (!validEmail(email)) {
    return {
      isInvalid: true,
      status: 422,
      message: 'A valid email address is required.'
    }
  }

  if (!('username' in req.body)) {
   return {
      isInvalid: true,
      status: 422, 
      message: "Missing field: username"
    }
  }
  
  if (typeof username !== 'string') {
    return {
      isInvalid: true, 
      status: 422, 
      message: "Incorrect field type: username."
    }
  }

  if (username === '') {
    return {
      isInvalid: true,
      status: 422, 
      message: "A username is required."
    }
  }

  if (!(password)) {
    return {
      isInvalid: true,
      status: 422, 
      message: "A password is required."
    }
  }

  if (typeof password !== 'string') {
    return {
      isInvalid: true,
      status: 422, 
      message: "Incorrect field type: password'"
    }
  }

  if (password === '') {
    return {
      isInvalid: true, 
      status: 422, 
      message: 'A password is required'
    }
  }

  if (password !== confirmed_password) {
    return {
      isInvalid: true, 
      status: 422, 
      message: 'Password does not match confirmed password.'
    }
  }
  
  return {
    isInvalid: false
  }
}

export default signUpValidity;


