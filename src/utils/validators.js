module.exports.userSignupValidator = (
  userName,
  firstName,
  middleName,
  lastName,
  gender,
  state,
  email,
  phone,
  referredBy,
  password,
  confirmPassword
) => {
  const errors = {};
  const numRegX = /^\d+$/;
  const alpnumRegX = /^[a-z0-9_]+$/i;
  const numLtRegX = /^[0-9]{11}/;
  const alpRegX = /[^a-z]/i;
  const chkSpcRegX = /\s/;
  const emlRegX =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

  if (userName.trim() === "") {
    errors.userName = "Username Cannot Be Empty!";
  } else if (chkSpcRegX.test(userName)) {
    errors.userName = "Username Cannot Contain Space";
  } else {
    if (!userName.match(alpnumRegX)) {
      errors.userName = "Username Can Only Be Alphanumeric";
    }
  }
  if (firstName.trim() === "") {
    errors.firstName = "First Name Cannot Be Empty!";
  } else if (chkSpcRegX.test(firstName)) {
    errors.firstName = "First Name Cannot Contain Space";
  } else {
    if (alpRegX.test(firstName)) {
      errors.firstName = "First Name Can Only Be Alphabets";
    }
  }
  if (middleName.length > 0) {
    if (middleName.trim() === "") {
      errors.middleName = "Middle Name Cannot Be Empty!";
    } else if (chkSpcRegX.test(middleName)) {
      errors.middleName = "Middle Name Cannot Contain Space";
    } else {
      if (alpRegX.test(middleName)) {
        errors.middleName = "Middle Name Can Only Be Alphabets";
      }
    }
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last Name Cannot Be Empty!";
  }
  if (chkSpcRegX.test(lastName)) {
    errors.lastName = "Last Name Cannot Contain Space";
  } else {
    if (alpRegX.test(lastName)) {
      errors.lastName = "Last Name Can Only Be Alphabets";
    }
  }

  if (gender.trim() === "") {
    errors.gender = "Gender Must Be Selected!";
  }
  if (state.trim() === "") {
    errors.state = "State Must Be Selected!";
  }
  if (email.trim() === "") {
    errors.email = "Email Cannot Be Empty!";
  } else {
    if (!email.match(emlRegX)) {
      errors.email = "Email Must Be A Valid Email Address!";
    }
  }
  if (phone.trim() === "") {
    errors.phone = "Phone Cannot Be Empty!";
  } else if (/\s/.test(phone)) {
    errors.phone = "Phone Number Cannot Contain Space";
  } else if (!numRegX.test(phone)) {
    errors.phone = "Phone Can Only Be Numbers";
  } else {
    if (!numLtRegX.test(phone)) {
      errors.phone = "Phone Must Be 11 Digits";
    }
  }
  if (referredBy.length > 0) {
    if (/\s/.test(referredBy)) {
      errors.referredBy = "Referrer Phone Number Cannot Contain Space";
    } else if (!numRegX.test(referredBy)) {
      errors.referredBy = "Referrer Phone Can Only Be Numbers";
    } else {
      if (!numLtRegX.test(referredBy)) {
        errors.referredBy = "Referrer Phone Must Be 11 Digits";
      }
    }
  }
  if (password === "") {
    errors.password = "Password Cannot Be Empty!";
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords Must Match!";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.userLoginValidator = (emailOrPhone, password) => {
  const errors = {};

  if (emailOrPhone.trim() === "") {
    errors.emailOrPhone = "Username or Phone Cannot Be Empty!";
  }

  if (password === "") {
    errors.password = "Password Cannot Be Empty!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.createPackageValidator = (
  packageName,
  image,
  payDuration,
  description,
  interest
) => {
  const errors = {};
  if (packageName.trim() === "") {
    errors.packageName = "Package Name Cannot Be Empty!";
  }

  if (payDuration.trim() === "") {
    errors.payDuration = "Pay Duration Name Cannot Be Empty!";
  }
  if (image.trim() === "") {
    errors.image = "Image Name Cannot Be Empty!";
  }
  if (description.trim() === "") {
    errors.description = "Description Cannot Be Empty!";
  }

  if (interest.trim() === "") {
    errors.interest = "Interest Cannot Be Empty!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
