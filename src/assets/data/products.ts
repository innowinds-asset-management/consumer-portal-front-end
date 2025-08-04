import { ProductType } from '@/types/data'
import { addOrSubtractDaysFromDate } from '@/utils/date'

export const productData: ProductType[] = [
  {
    id: '501',
    category: 'Fashion',
    amount: '42,430',
    date: addOrSubtractDaysFromDate(10),
    status: 'Paid',
  },
  {
    id: '502',
    category: 'Electronics',
    amount: '416',
    date: addOrSubtractDaysFromDate(100),
    status: 'Overdue',
  },
  {
    id: '503',
    category: 'Mobile Accessories',
    amount: '187',
    date: addOrSubtractDaysFromDate(45),
    status: 'Paid',
  },
  {
    id: '504',
    category: 'Electronics',
    amount: '165',
    date: addOrSubtractDaysFromDate(450),
    status: 'Paid',
  },
  {
    id: '505',
    category: 'Electronics',
    amount: '165',
    date: addOrSubtractDaysFromDate(450),
    status: 'Cancelled',
  },
  {
    id: '506',
    category: 'Watches',
    amount: '192',
    date: addOrSubtractDaysFromDate(4),
    status: 'Overdue',
  },
  {
    id: '507',
    category: 'Bags',
    amount: '159',
    date: addOrSubtractDaysFromDate(40),
    status: 'Paid',
  },
  {
    id: '508',
    category: "Cloth's",
    amount: '259',
    date: addOrSubtractDaysFromDate(89),
    status: 'Cancelled',
  },
  {
    id: '509',
    category: 'Sofa',
    amount: '259',
    date: addOrSubtractDaysFromDate(178),
    status: 'Paid',
  },
  {
    id: '600',
    category: 'Shoes',
    amount: '256',
    date: addOrSubtractDaysFromDate(6),
    status: 'Pending',
  },
]
