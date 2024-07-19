export class ConfirmationDialogData {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;

  constructor(title?: string, description?: string, confirmText?: string, cancelText?: string) {
    this.title = title ?? "Confirmation dialog";
    this.description = description ?? "";
    this.confirmText = confirmText ?? "Confirm";
    this.cancelText = cancelText ?? "Cancel";
  }
}
