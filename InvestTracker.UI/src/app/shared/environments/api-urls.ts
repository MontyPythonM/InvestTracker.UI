import { environment } from "./environment";

export const apiUrl = {
  module: {
    users: `${environment.serverUrl}/users-module`,
    offers: `${environment.serverUrl}/offers-module`,
    calculators: `${environment.serverUrl}/calculators-module`,
    strategies: `${environment.serverUrl}/investment-strategies-module`,
    notifications: `${environment.serverUrl}/notifications-module`
  }
}