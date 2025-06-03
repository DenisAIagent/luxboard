export const PLANS = {
  discovery: { name: 'Discovery', iaSearchQuota: 2, suggestionQuota: 0, users: 1 },
  essential: { name: 'Essential', iaSearchQuota: 25, suggestionQuota: 15, users: 3 },
  professional: { name: 'Professional', iaSearchQuota: 100, suggestionQuota: 50, users: 10 },
  enterprise: { name: 'Enterprise', iaSearchQuota: -1, suggestionQuota: -1, users: -1 },
} as const;

export type PlanKey = keyof typeof PLANS;
