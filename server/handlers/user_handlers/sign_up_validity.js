const validEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const allFormFieldsFilledIn = request => {
 for (const field in request) {
   if (request[field] === '') {
     return false; 
   }
 }
 return true; 
};

 const passwordMeetsRequirements = password => {
  const symbol = /[!@#$%^&*-_=+-{}\\?.()]/;
  const digit = /\d+/g;
  
  if (password.length < 6) {
    return false; 
  } else if (!password.match(digit)) {
    return false; 
  } else if (!password.match(symbol)) {
    return false; 
  }
  return true; 
};

export const signUpValidity = (req) => {
  let { password, email, confirmed_password } = req.body;
  password = password.trim();
  confirmed_password = confirmed_password.trim(); 
  email = email.trim();

  if (!allFormFieldsFilledIn(req.body)) {
     return {
      isInvalid: true, 
      status: 422,
      message: 'All fields are required.'
    };
  }

  if (!validEmail(email)) {
    return {
      isInvalid: true,
      status: 422,
      message: 'A valid email address is required.'
    };
  }

  if (password !== confirmed_password) {
    return {
      isInvalid: true, 
      status: 422, 
      message: 'Passwords do not match.'
    };
  }

  if (!passwordMeetsRequirements(password)) {
     return {
      isInvalid: true, 
      status: 422, 
      message: 'Passwords must contain 6 characters, including 1 number and 1 symbol.'
    };
  }
  
  return {
    isInvalid: false
  };
};

