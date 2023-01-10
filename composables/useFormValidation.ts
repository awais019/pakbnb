function validateName(name: string): boolean {
  if (name.length < 4) {
    return false;
  }
  return true;
}

function validateEmail(email: string) {
  const pattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

  if (!pattern.test(email)) {
    return false;
  }
  return true;
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return false;
  }
  return true;
}

export default () => {
  return {
    validateName,
    validateEmail,
    validatePassword,
  };
};
