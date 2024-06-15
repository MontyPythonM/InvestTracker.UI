export class ResetPasswordForm {
  resetPasswordKey: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(resetPasswordKey: string, newPassword: string, confirmNewPassword: string) {
    this.resetPasswordKey = resetPasswordKey;
    this.newPassword = newPassword;
    this.confirmNewPassword = confirmNewPassword;
  }
}
