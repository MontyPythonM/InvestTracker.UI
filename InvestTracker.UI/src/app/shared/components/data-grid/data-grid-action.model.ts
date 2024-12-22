import DevExpress from "devextreme";
import ButtonType = DevExpress.common.ButtonType;

export class DataGridAction {
  action: Function;
  icon: string;
  text: string;
  type: ButtonType

  constructor(action: Function, icon: string, text: string, type: ButtonType) {
    this.action = action;
    this.icon = icon;
    this.text = text;
    this.type = type;
  }

  static Default = (action: Function) : DataGridAction => {
    return new DataGridAction(action, 'add', 'Add', 'success');
  }
}
