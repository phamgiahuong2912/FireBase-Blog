export const validation = (error, name, data, option) => {
  console.log("d", data);
  option = option ? option : {};
  const required = "This is field required";
  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data[name]) {
    error[name] = required;
  } else if (name.includes("email") && !regEmail.test(data[name])) {
    error[name] = "Email is invalid";
  } else if (
    (name.includes("confirmPassWord") && data[name] != option.password) ||
    (name.includes("password") && data[name] != option.confirmPassWord && option.confirmPassWord && option.confirmPassWord.length > 0)
  ) {
    if (name.includes("password") && data[name].length > 0) {
      delete error[name];
    }
    error["confirmPassWord"] = "Password is not match";
  } else {
    if (name.includes("password") && data[name] == option.confirmPassWord) {
      delete error["confirmPassWord"];
    }
    delete error[name];
  }

  return error;
};
