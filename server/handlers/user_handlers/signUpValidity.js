//Checks that email is valid

const validEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Checks that all fields of the sign up and sign in form are filled out before user can submit

export const allFormFieldsFilledIn = request => {
 for (let field in request) {
   if (request[field] === '') {
     return false; 
   }
 }
 return true; 
};

//Checks that the user password meets the requirement of having six characters, 1 symbol, and 1 digit

 const passwordMeetsRequirements = password => {
  let symbol = /[!@#$%^&*-_=+-{}\\?.()]/;
  let digit = /\d+/g;
  
  if (password.length < 6) {
    return false; 
  }
  else if (!password.match(digit)) {
    return false; 
  } 
  else if (!password.match(symbol)) {
    return false; 
  }
  return true; 
}

//Uses above functions to make sure the sign up is valid before submitting the info to the database

export const signUpValidity = (req) => {
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
      message: "All fields are required."
    }
  }

  if (!validEmail(email)) {
    return {
      isInvalid: true,
      status: 422,
      message: 'A valid email address is required.'
    }
  }

  if (password !== confirmed_password) {
    return {
      isInvalid: true, 
      status: 422, 
      message: 'Passwords do not match.'
    }
  }

  if (!passwordMeetsRequirements(password)) {
     return {
      isInvalid: true, 
      status: 422, 
      message: 'Passwords must contain 6 characters, including 1 number and 1 symbol.'
    }
  }
  
  return {
    isInvalid: false
  }
}




