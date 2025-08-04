export type ContactDetailsType = {
  icon: string
  title: string
  description: string
}

export const faqData = {
  General: [
    {
      question: 'What is a session tracking dashboard?',
      answer:
        'A session tracking dashboard is a visual tool used to monitor and analyze user sessions on a website or application. It provides insights into user behavior, including their interactions, paths, and engagement patterns during their visits.',
    },
    {
      question: 'Why is session tracking important for a website or app?',
      answer:
        'For online stores, session tracking is essential to manage the contents of a user’s shopping cart. Without session tracking, the items in the cart could be lost as the user navigates through the site.',
    },
    {
      question: 'What metrics can I track in a session tracking dashboard?',
      answer:
        'In a session tracking dashboard, you can track a variety of metrics to gain insights into user behavior, website performance, and overall user experience. Here are some key metrics you can monitor:',
    },
    {
      question: 'How can I use session tracking data to improve my website or app?',
      answer:
        'Use scroll depth and time-on-page metrics to determine which content is engaging users the most. Focus on creating similar content or improving under performing pages.',
    },
    {
      question: 'What are some common challenges with session tracking?',
      answer:
        'Session tracking, while invaluable for understanding user behavior and optimizing website or app performance, comes with several challenges. One major issue is ensuring data privacy and compliance with regulations like GDPR and CCPA.',
    },
  ],
  Integration: [
    {
      question: 'How can I ensure data accuracy in my session tracking dashboard?',
      answer:
        'Set an appropriate session timeout period to avoid splitting a single session into multiple sessions or merging distinct sessions into one. Typically, a 30-minute timeout is standard, but this can be adjusted based on',
    },
    {
      question: 'Can I track user sessions across multiple platforms and devices?',
      answer:
        'Yes, you can track user sessions across multiple platforms and devices, but it requires implementing a few strategies and using the right tools to ensure accurate tracking. Here’s how you can achieve this:',
    },
    {
      question: 'What is integration, and why is it important for our session tracking dashboard?',
      answer:
        'Session management involves managing requests between a user and web-based app or service. Learn about best practices of session management and the attacks',
    },
    {
      question: 'Which systems or platforms can be integrated with our session tracking dashboard?',
      answer:
        'Integrating your session tracking dashboard with various systems and platforms can provide a more comprehensive view of user behavior and streamline data management. Here are some commonly integrated systems and platforms',
    },
    {
      question: 'Is technical expertise required to perform an integration?',
      answer:
        'Session tracking, while invaluable for understanding user behavior and optimizing website or app performance, comes with several challenges. One major issue is ensuring data privacy and compliance with regulations like GDPR and CCPA.',
    },
  ],
  Payments: [
    {
      question: 'When will payment be processed for my order?',
      answer:
        'Payment is processed during the checkout procedure when you finalize your order. A confirmation screen displaying the order number signifies that payment has been successfully completed.',
    },
    {
      question: 'What is the process for payment on my order?',
      answer:
        'We welcome payments via Visa®, MasterCard®, American Express®, and PayPal®. Rest assured, all information transmitted to our servers is encrypted, ensuring the utmost security for your credit card details.',
    },
    {
      question: 'What steps should I take if I encounter difficulties while placing an order?',
      answer:
        'If you encounter any technical issues with our website, please reach out to us via our support portal. Alternatively, you can contact us toll-free at 1-000-000-000 or email us at order@companymail.com.',
    },
    {
      question: 'Which license is required for an end product exclusively accessible to paying users?',
      answer:
        'If you have paying users or you are developing any SaaS products then you need an Extended License. For each products, you need a license. You can get free lifetime updates as well.',
    },
    {
      question: 'How does billing work?',
      answer: 'Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.',
    },
  ],
  Shipping: [
    {
      question: 'What is the shipping method for delivering my order?',
      answer:
        'For large items, we use a third-party logistics company to deliver your product, providing you with scheduled "room of choice" delivery service. For smaller items, we offer complimentary parcel delivery.',
    },
    {
      question: 'How much does delivery for my order cost?',
      answer:
        'Scheduled delivery is priced at either $69 or $99 per order, depending on the destination postal code. Parcel delivery, on the other hand, is complimentary.',
    },
    {
      question: 'What steps should I take if my product arrives in a damaged condition?',
      answer:
        'We will swiftly replace any product damaged during transit. Simply reach out to our support team to inform us of the issue within 48 hours of the products arrival.',
    },
    {
      question: 'What steps must I take to commence selling?',
      answer:
        'We will swiftly replace any product damaged during transit. Simply reach out to our support team to inform us of the issue within 48 hours of the products arrival.',
    },
    {
      question: 'Can other info be added to an invoice?',
      answer: 'At the moment, the only way to add additional information to invoices is to add the information to the workspaces name manually.',
    },
  ],
  Return: [
    {
      question: 'Is it possible for me to initiate a return for my product?',
      answer:
        'You may initiate a return for your product within 15 days of delivery by reaching out to our support team. All returned merchandise must be in its original packaging with all accompanying items intact.',
    },
    {
      question: 'Is it possible to cancel my order?',
      answer:
        'For scheduled delivery orders, cancellation is permissible up to 72 hours before your chosen delivery date for a full refund. Unfortunately, parcel delivery orders cannot be cancelled. Nevertheless, upon request, a free return label can be provided .',
    },
    {
      question: 'Where can I check the status of my return?',
      answer: 'Find the item in Your Orders Choose Return/Refund Status',
    },
    {
      question: 'What is the duration of the warranty?',
      answer: 'Find the item in Your Orders Choose Return/Refund Status',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We understand that things change. You can cancel your plan at any time and well refund you the difference already paid.',
    },
  ],
}

export const contactDetailsData: ContactDetailsType[] = [
  {
    icon: 'tabler:search',
    title: 'Visit Help Center',
    description: 'Check Out Tutorials',
  },
  {
    icon: 'tabler:phone',
    title: 'Book a Demo',
    description: '1:1 Talk With A Tax Specialist.',
  },
  {
    icon: 'tabler:brand-hipchat',
    title: 'Live Chat Support',
    description: '24/7 available. No chatbots.',
  },
]
