// import logo1 from '@/assets/images/products/logo/logo-1.svg';
// import logo2 from '@/assets/images/products/logo/logo-2.svg';
// import logo3 from '@/assets/images/products/logo/logo-3.svg';
// import logo4 from '@/assets/images/products/logo/logo-4.svg';
// import logo5 from '@/assets/images/products/logo/logo-5.svg';
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar10 from '@/assets/images/users/avatar-10.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'
import avatar7 from '@/assets/images/users/avatar-7.jpg'
import avatar8 from '@/assets/images/users/avatar-8.jpg'
import avatar9 from '@/assets/images/users/avatar-9.jpg'
import { currency } from '@/context/constants'
import { Employee, FilesType, InvoicesType, UserType } from '@/types/data'
import { addOrSubtractDaysFromDate } from '@/utils/date'

// export const brandListData: BrandListType[] = [
//   {
//     id: '101',
//     name: 'ElectroMart - USA',
//     year: 2015,
//     stores: 300,
//     products: '5,200',
//     image: logo1,
//     status: 'Active'
//   },
//   {
//     id: '102',
//     name: 'FurniStyle - UK',
//     year: 2010,
//     stores: 120,
//     products: '1,100',
//     image: logo2,
//     status: 'Active'
//   },
//   {
//     id: '103',
//     name: 'AutoGear - Germany',
//     year: 2005,
//     stores: 50,
//     products: '850',
//     image: logo3,
//     status: 'Pending'
//   },
//   {
//     id: '104',
//     name: 'StyleCore - Italy',
//     year: 1998,
//     stores: 200,
//     products: '2300',
//     image: logo4,
//     status: 'Inactive'
//   },
//   {
//     id: '105',
//     name: 'TechVerse - India',
//     year: 2020,
//     stores: 400,
//     products: '7,500',
//     image: logo5,
//     status: 'Active'
//   },

// ]

export const userData: UserType[] = [
  {
    id: '1',
    avatar: avatar1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    status: 'Active',
  },
  {
    id: '2',
    avatar: avatar2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Pending',
  },
  {
    id: '3',
    avatar: avatar3,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Viewer',
    status: 'Inactive',
  },
  {
    id: '4',
    avatar: avatar4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Manager',
    status: 'Active',
  },
  {
    id: '5',
    avatar: avatar5,
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    role: 'Support',
    status: 'Pending',
  },
  {
    id: '6',
    avatar: avatar6,
    name: 'Michael S. Parks',
    email: 'michaelparks@mail.com',
    role: 'Viewer',
    status: 'Active',
  },
  {
    id: '7',
    avatar: avatar7,
    name: 'Samantha W. Howard',
    email: 'samantha.howard@mail.com',
    role: 'Editor',
    status: 'Active',
  },
  {
    id: '8',
    avatar: avatar8,
    name: 'Jonathan D. Keller',
    email: 'jonathan.keller@mail.com',
    role: 'Manager',
    status: 'Pending',
  },
  {
    id: '9',
    avatar: avatar9,
    name: 'Emily R. Stone',
    email: 'emilystone@mail.com',
    role: 'Editor',
    status: 'Inactive',
  },
  {
    id: '10',
    avatar: avatar10,
    name: 'Carlos M. Reyes',
    email: 'carlos.reyes@mail.com',
    role: 'Viewer',
    status: 'Active',
  },
]

export const filesData: FilesType[] = [
  {
    id: '201',
    title: 'Dashboard-requirements.docx',
    icon: 'tabler:file-type-docx',
    file: '12 Docx',
    fileVariant: 'info',
    userId: '1',
    date: addOrSubtractDaysFromDate(21),
    size: 128,
    members: [
      {
        text: 'D',
        variant: 'success',
      },
      {
        text: 'K',
        variant: 'primary',
      },
      {
        text: 'H',
        variant: 'secondary',
      },
      {
        text: 'L',
        variant: 'warning',
      },
      {
        text: 'G',
        variant: 'info',
      },
    ],
  },
  {
    id: '202',
    title: 'ocen-dashboard.pdf',
    icon: 'tabler:file-type-pdf',
    file: '18 Pdf',
    fileVariant: 'danger',
    userId: '2',
    date: addOrSubtractDaysFromDate(210),
    size: 521,
    members: [
      {
        text: 'Y',
        variant: 'danger',
      },
      {
        text: 'L',
        variant: 'success',
      },
      {
        text: 'O',
        variant: 'dark',
      },
      {
        text: 'J',
        variant: 'warning',
      },
      {
        text: 'G',
        variant: 'primary',
      },
    ],
  },
  {
    id: '203',
    title: 'Dashboard tech requirements',
    icon: 'tabler:files',
    file: '12 File',
    fileVariant: 'warning',
    userId: '3',
    date: addOrSubtractDaysFromDate(100),
    size: 7.2,
    members: [
      {
        text: 'A',
        variant: 'primary',
      },
      {
        text: 'B',
        variant: 'warning',
      },
      {
        text: 'R',
        variant: 'danger',
      },
      {
        text: 'C',
        variant: 'secondary',
      },
      {
        text: 'U',
        variant: 'dark',
      },
    ],
  },
  {
    id: '204',
    title: 'dashboard.jpg',
    icon: 'tabler:file-type-jpg',
    file: '172 Jpg Photo',
    fileVariant: 'primary',
    userId: '4',
    date: addOrSubtractDaysFromDate(354),
    size: 54.2,
    members: [
      {
        text: 'L',
        variant: 'warning',
      },
      {
        text: 'Y',
        variant: 'secondary',
      },
      {
        text: 'A',
        variant: 'dark',
      },
      {
        text: 'R',
        variant: 'primary',
      },
      {
        text: 'V',
        variant: 'info',
      },
    ],
  },
  {
    id: '205',
    title: 'admin-hospital.zip',
    icon: 'tabler:file-type-zip',
    file: 'admin-hospital.zip',
    fileVariant: 'success',
    userId: '5',
    date: addOrSubtractDaysFromDate(45),
    size: 8.3,
    members: [
      {
        text: 'G',
        variant: 'dark',
      },
      {
        text: 'O',
        variant: 'danger',
      },
      {
        text: 'W',
        variant: 'secondary',
      },
      {
        text: 'A',
        variant: 'primary',
      },
      {
        text: 'K',
        variant: 'warning',
      },
    ],
  },
  {
    id: '206',
    title: 'Project-summary.pdf',
    icon: 'tabler:file-type-pdf',
    file: '5 Pages',
    fileVariant: 'danger',
    userId: '6',
    date: addOrSubtractDaysFromDate(150),
    size: 80,
    members: [
      {
        text: 'A',
        variant: 'success',
      },
      {
        text: 'T',
        variant: 'primary',
      },
    ],
  },
  {
    id: '207',
    title: 'Sales-data.xlsx',
    icon: 'tabler:file-type-xls',
    file: '20 Sheets',
    fileVariant: 'primary',
    userId: '7',
    date: addOrSubtractDaysFromDate(47),
    size: 256,
    members: [
      {
        text: 'S',
        variant: 'info',
      },
      {
        text: 'C',
        variant: 'warning',
      },
    ],
  },
  {
    id: '208',
    title: 'Presentation-slides.pptx',
    icon: 'tabler:file-type-ppt',
    file: '15 Slides',
    fileVariant: 'warning',
    userId: '8',
    date: addOrSubtractDaysFromDate(90),
    size: 64,
    members: [
      {
        text: 'J',
        variant: 'danger',
      },
      {
        text: 'M',
        variant: 'primary',
      },
    ],
  },
  {
    id: '209',
    title: 'Readme.txt',
    icon: 'tabler:file-type-txt',
    file: '1 Page',
    fileVariant: 'success',
    userId: '9',
    date: addOrSubtractDaysFromDate(10),
    size: 2,
    members: [
      {
        text: 'E',
        variant: 'warning',
      },
      {
        text: 'N',
        variant: 'secondary',
      },
    ],
  },
  {
    id: '210',
    title: 'Team-photo.jpg',
    icon: 'tabler:file-type-jpg',
    file: '1 Image',
    fileVariant: 'secondary',
    userId: '10',
    date: addOrSubtractDaysFromDate(150),
    size: 3,
    members: [
      {
        text: 'C',
        variant: 'info',
      },
      {
        text: 'R',
        variant: 'danger',
      },
    ],
  },
]

export const invoicesData: InvoicesType[] = [
  {
    id: '451',
    userId: '1',
    productId: '501',
    amount: '42,430',
    date: addOrSubtractDaysFromDate(15),
    invoicesStatus: 'Paid',
  },
  {
    id: '452',
    userId: '2',
    productId: '502',
    amount: '416',
    date: addOrSubtractDaysFromDate(25),
    invoicesStatus: 'Pending',
  },
  {
    id: '453',
    userId: '3',
    productId: '503',
    amount: '187',
    date: addOrSubtractDaysFromDate(320),
    invoicesStatus: 'Paid',
  },
  {
    id: '454',
    userId: '4',
    productId: '504',
    amount: '165',
    date: addOrSubtractDaysFromDate(48),
    invoicesStatus: 'Paid',
  },
  {
    id: '455',
    userId: '5',
    productId: '505',
    amount: '165',
    date: addOrSubtractDaysFromDate(198),
    invoicesStatus: 'Cancelled',
  },
  {
    id: '456',
    userId: '6',
    productId: '506',
    amount: '192',
    date: addOrSubtractDaysFromDate(56),
    invoicesStatus: 'Pending',
  },
  {
    id: '457',
    userId: '7',
    productId: '507',
    amount: '159',
    date: addOrSubtractDaysFromDate(654),
    invoicesStatus: 'Paid',
  },
  {
    id: '458',
    userId: '8',
    productId: '508',
    amount: '259',
    date: addOrSubtractDaysFromDate(45),
    invoicesStatus: 'Cancelled',
  },
  {
    id: '459',
    userId: '9',
    productId: '509',
    amount: '259',
    date: addOrSubtractDaysFromDate(74),
    invoicesStatus: 'Paid',
  },
  {
    id: '460',
    userId: '10',
    productId: '600',
    amount: '256',
    date: addOrSubtractDaysFromDate(654),
    invoicesStatus: 'Pending',
  },
]

export const dataTableRecords: Employee[] = [
  {
    id: '11',
    name: 'Jonathan',
    email: 'jonathan@example.com',
    position: 'Senior Implementation Architect',
    company: 'Hauck Inc',
    country: 'Holy See',
    office: 'Tokyo',
    age: 33,
    startDate: '2008/11/28',
    salary: `${currency}162,700`,
  },
  {
    id: '12',
    name: 'Harold',
    email: 'harold@example.com',
    position: 'Forward Creative Coordinator',
    company: 'Metz Inc',
    country: 'Iran',
    office: 'London',
    age: 47,
    startDate: '2009/10/09',
    salary: `${currency}1,200,000`,
  },
  {
    id: '13',
    name: 'Shannon',
    email: 'shannon@example.com',
    position: 'Legacy Functionality Associate',
    company: 'Zemlak Group',
    country: 'South Georgia',
    office: 'San Francisco',
    age: 66,
    startDate: '2009/01/12',
    salary: `${currency}86,000`,
  },
  {
    id: '14',
    name: 'Robert',
    email: 'robert@example.com',
    position: 'Product Accounts Technician',
    company: 'Hoeger',
    country: 'San Marino',
    office: 'London',
    age: 41,
    startDate: '2012/10/13',
    salary: `${currency}y132,000`,
  },
  {
    id: '15',
    name: 'Noel',
    email: 'noel@example.com',
    position: 'Customer Data Director',
    company: 'Howell - Rippin',
    country: 'Germany',
    office: 'San Francisco',
    age: 28,
    startDate: '2011/06/07',
    salary: `${currency}206,850`,
  },
  {
    id: '16',
    name: 'Traci',
    email: 'traci@example.com',
    position: 'Corporate Identity Director',
    company: 'Koelpin - Goldner',
    country: 'Vanuatu',
    office: 'New York',
    age: 61,
    startDate: '2012/12/02',
    salary: `${currency}372,000`,
  },
  {
    id: '17',
    name: 'Kerry',
    email: 'kerry@example.com',
    position: 'Lead Applications Associate',
    company: 'Feeney, Langworth and Tremblay',
    country: 'Niger',
    office: 'London',
    age: 38,
    startDate: '2011/05/03',
    salary: `${currency}163,500`,
  },
  {
    id: '18',
    name: 'Patsy',
    email: 'patsy@example.com',
    position: 'Dynamic Assurance Director',
    company: 'Streich Group',
    country: 'Niue',
    office: 'New York',
    age: 21,
    startDate: '2011/12/12',
    salary: `${currency}106,450`,
  },
  {
    id: '19',
    name: 'Cathy',
    email: 'cathy@example.com',
    position: 'Customer Data Director',
    company: 'Ebert, Schamberger and Johnston',
    country: 'Mexico',
    office: 'New York',
    age: 46,
    startDate: '2011/12/06',
    salary: `${currency}145,600`,
  },
  {
    id: '20',
    name: 'Tyrone',
    email: 'tyrone@example.com',
    position: 'Senior Response Liaison',
    company: 'Raynor, Rolfson and Daugherty',
    country: 'Qatar',
    office: 'Edinburgh',
    age: 22,
    startDate: '2012/03/29',
    salary: `${currency}433,060`,
  },
]
