export type PricingTwoType = {
  title: string
  description: string
  price: number
  popular?: boolean
  features: string[]
}

export const pricingTwoData: PricingTwoType[] = [
  {
    title: 'Solo Plan',
    description: 'Tailored for individual professionals and hobbyists.',
    price: 229,
    features: ['Single user license', 'Access to all components', 'Lifetime access', 'Unlimited projects', 'Customer support', 'Free updates'],
  },
  {
    title: 'Startup Plan',
    description: 'Best suited for experienced developers and small teams.',
    price: 399,
    popular: true,
    features: [
      '5 user license',
      'Access to all components',
      'Lifetime access',
      'Unlimited projects',
      'Priority tech support',
      'Customer support',
      'Free updates',
    ],
  },
  {
    title: 'Organization Plan',
    description: 'Ideal for large teams and organization',
    price: 799,
    features: ['25 user license', 'Access to all components', 'Lifetime access', 'Unlimited projects', 'Customer support', 'Free updates'],
  },
]
