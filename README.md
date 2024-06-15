# InvestTracker.UI
## About application

**InvestTracker.UI** is frontend part of a financial assets monitoring application written in Angular 17.
The application allows you to enter selected financial assets and track changes in their value over time. 

## Status
Project status: **Work in progress**

Features:
- common:
  - light/dark mode
  - roll-up navigation side panel
  - authorization guard based on user subscription and role

- account:
  - login
  - logout
  - register
  - forgot password
  - reset password
  - refresh token (invoked automatically when user JWT expired)

- users
  - get current user details
  - delete own account

## How to start the solution
Type terminal command `ng serve` to run application on localhost:4200.
