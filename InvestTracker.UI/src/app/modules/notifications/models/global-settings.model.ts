export class GlobalSettings {
  effectiveFrom: Date;
  enableNotifications: boolean;
  enableEmails: boolean;
  administratorsActivity: boolean;
  investmentStrategiesActivity: boolean;
  portfoliosActivity: boolean;
  assetActivity: boolean;
  existingCollaborationsActivity: boolean;
  newCollaborationsActivity: boolean;

  constructor(effectiveFrom: Date, enableNotifications: boolean, enableEmails: boolean, administratorsActivity: boolean, investmentStrategiesActivity: boolean,
              portfoliosActivity: boolean, assetActivity: boolean, existingCollaborationsActivity: boolean, newCollaborationsActivity: boolean) {
    this.effectiveFrom = effectiveFrom;
    this.enableNotifications = enableNotifications;
    this.enableEmails = enableEmails;
    this.administratorsActivity = administratorsActivity;
    this.investmentStrategiesActivity = investmentStrategiesActivity;
    this.portfoliosActivity = portfoliosActivity;
    this.assetActivity = assetActivity;
    this.existingCollaborationsActivity = existingCollaborationsActivity;
    this.newCollaborationsActivity = newCollaborationsActivity;
  }
}
