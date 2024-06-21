export enum SystemSubscription {
  None = 'None',
  StandardInvestor = 'StandardInvestor',
  ProfessionalInvestor = 'ProfessionalInvestor',
  Advisor = 'Advisor'
}

export const systemSubscriptions: string[] = [
  SystemSubscription.None,
  SystemSubscription.StandardInvestor,
  SystemSubscription.ProfessionalInvestor,
  SystemSubscription.Advisor
];