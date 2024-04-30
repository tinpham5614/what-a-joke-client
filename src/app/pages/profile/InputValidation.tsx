type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const validatePassword = (props: ChangePasswordData) => {
  if (!props.currentPassword) {
    return "Current password is required";
  } else if (!props.newPassword) {
    return "New password is required";
  } else if (!props.confirmNewPassword) {
    return "Confirm new password is required";
  }

  if (props.newPassword !== props.confirmNewPassword) {
    return "Passwords do not match";
  }

  if (props.newPassword.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (props.newPassword === props.currentPassword) {
    return "New password must be different from previous password";
  }
  return "";
};

export default validatePassword;
