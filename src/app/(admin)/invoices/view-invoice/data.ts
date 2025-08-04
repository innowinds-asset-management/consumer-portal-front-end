export type InvoiceProductType = {
  icon: string
  title: string
  description: string
  quantity: number
  price: number
  amount: number
}

export const invoiceProductData: InvoiceProductType[] = [
  {
    title: 'React Development',
    description: 'Advance payment for 25 hours',
    icon: 'logos:react',
    quantity: 25,
    price: 40,
    amount: 1000,
  },
  {
    title: 'OpenAI Support',
    description: 'Small help for bug fixes',
    icon: 'logos:openai-icon',
    quantity: 1,
    price: 200,
    amount: 200,
  },
  {
    title: 'Custom App Development - iOS',
    description: 'Phase 1 payment',
    icon: 'logos:apple-app-store',
    quantity: 1,
    price: 1200,
    amount: 1200,
  },
  {
    title: 'Digital Ocean Server Setup',
    description: 'Fix amount',
    icon: 'logos:digital-ocean-icon',
    quantity: 1,
    price: 199,
    amount: 199,
  },
]
