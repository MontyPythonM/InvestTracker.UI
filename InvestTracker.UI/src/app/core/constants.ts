import { HttpHeaders } from "@angular/common/http";

export const APP_NAME = 'Invest Tracker';
export const GITHUB_LINK = 'https://github.com/MontyPythonM';
export const THEME_KEY = 'theme';
export const NAV_STATE_KEY = 'navigation-section-state';
export const ACCESS_TOKEN_KEY = 'access-token';
export const PHONE_REGEX = /^\+?(\d{1,3})?[-. ]?(\(?\d{1,4}\)?[-. ]?)?(\d{1,4}[-. ]?){1,3}\d{1,4}$/;
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm:ss';
export const DATE_FORMAT = 'dd/MM/yyyy';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  body: {},
  observe: 'response' as 'body',
  withCredentials: true
};