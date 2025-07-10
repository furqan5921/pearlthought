import { 
  Teacher, 
  Attendance, 
  Salary, 
  Performance, 
  LeaveRequest,
  AttendanceTrend,
  SalaryBreakdown,
  Department 
} from './types';

// Mock Teachers Data
export const mockTeachers: Teacher[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Johnson',
    dateOfBirth: '1985-03-15',
    hireDate: '2020-08-15',
    department: 'Science',
    subject: ['Mathematics', 'Physics'],
    qualification: 'PhD in Mathematics',
    experience: 8,
    salary: 75000,
    employmentType: 'full-time',
    status: 'active',
    address: {
      street: '123 Oak Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA'
    },
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4568'
    },
    documents: [
      {
        id: '1',
        name: 'PhD Certificate',
        type: 'certificate',
        url: '/documents/phd-cert.pdf',
        uploadDate: '2020-08-15',
        size: 1024000
      }
    ],
    performanceRating: 4.5,
    lastReviewDate: '2024-01-15',
    createdAt: '2020-08-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@school.edu',
    phone: '+1 (555) 234-5678',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Michael%20Chen',
    dateOfBirth: '1982-07-22',
    hireDate: '2018-01-10',
    department: 'Science',
    subject: ['Physics', 'Chemistry'],
    qualification: 'MSc in Physics',
    experience: 12,
    salary: 82000,
    employmentType: 'full-time',
    status: 'active',
    address: {
      street: '456 Pine Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Lisa Chen',
      relationship: 'Spouse',
      phone: '+1 (555) 234-5679'
    },
    documents: [
      {
        id: '2',
        name: 'MSc Certificate',
        type: 'certificate',
        url: '/documents/msc-cert.pdf',
        uploadDate: '2018-01-10',
        size: 856000
      }
    ],
    performanceRating: 4.8,
    lastReviewDate: '2024-02-10',
    createdAt: '2018-01-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@school.edu',
    phone: '+1 (555) 345-6789',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Emily%20Rodriguez',
    dateOfBirth: '1990-11-08',
    hireDate: '2022-09-01',
    department: 'Arts',
    subject: ['English Literature', 'Creative Writing'],
    qualification: 'MA in English Literature',
    experience: 5,
    salary: 68000,
    employmentType: 'full-time',
    status: 'active',
    address: {
      street: '789 Maple Drive',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Carlos Rodriguez',
      relationship: 'Father',
      phone: '+1 (555) 345-6790'
    },
    documents: [
      {
        id: '3',
        name: 'MA Certificate',
        type: 'certificate',
        url: '/documents/ma-cert.pdf',
        uploadDate: '2022-09-01',
        size: 742000
      }
    ],
    performanceRating: 4.2,
    lastReviewDate: '2024-03-01',
    createdAt: '2022-09-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@school.edu',
    phone: '+1 (555) 456-7890',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=David%20Wilson',
    dateOfBirth: '1988-05-12',
    hireDate: '2021-03-15',
    department: 'Technology',
    subject: ['Computer Science', 'Programming'],
    qualification: 'BSc in Computer Science',
    experience: 6,
    salary: 72000,
    employmentType: 'full-time',
    status: 'active',
    address: {
      street: '321 Cedar Lane',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Sarah Wilson',
      relationship: 'Sister',
      phone: '+1 (555) 456-7891'
    },
    documents: [
      {
        id: '4',
        name: 'BSc Certificate',
        type: 'certificate',
        url: '/documents/bsc-cert.pdf',
        uploadDate: '2021-03-15',
        size: 698000
      }
    ],
    performanceRating: 4.3,
    lastReviewDate: '2024-03-15',
    createdAt: '2021-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    firstName: 'Jessica',
    lastName: 'Brown',
    email: 'jessica.brown@school.edu',
    phone: '+1 (555) 567-8901',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Jessica%20Brown',
    dateOfBirth: '1987-09-25',
    hireDate: '2019-06-01',
    department: 'Arts',
    subject: ['History', 'Social Studies'],
    qualification: 'MA in History',
    experience: 9,
    salary: 71000,
    employmentType: 'full-time',
    status: 'on-leave',
    address: {
      street: '654 Birch Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62705',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Mark Brown',
      relationship: 'Spouse',
      phone: '+1 (555) 567-8902'
    },
    documents: [
      {
        id: '5',
        name: 'MA Certificate',
        type: 'certificate',
        url: '/documents/ma-hist-cert.pdf',
        uploadDate: '2019-06-01',
        size: 789000
      }
    ],
    performanceRating: 4.1,
    lastReviewDate: '2024-01-01',
    createdAt: '2019-06-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock Attendance Data
export const mockAttendance: Attendance[] = [
  {
    id: '1',
    teacherId: '1',
    date: '2024-07-10',
    checkIn: '08:00',
    checkOut: '16:00',
    status: 'present',
    createdAt: '2024-07-10T08:00:00Z'
  },
  {
    id: '2',
    teacherId: '2',
    date: '2024-07-10',
    checkIn: '08:15',
    checkOut: '16:00',
    status: 'late',
    createdAt: '2024-07-10T08:15:00Z'
  },
  {
    id: '3',
    teacherId: '3',
    date: '2024-07-10',
    checkIn: '08:00',
    checkOut: '16:00',
    status: 'present',
    createdAt: '2024-07-10T08:00:00Z'
  },
  {
    id: '4',
    teacherId: '4',
    date: '2024-07-10',
    status: 'absent',
    notes: 'Sick leave',
    createdAt: '2024-07-10T00:00:00Z'
  },
  {
    id: '5',
    teacherId: '5',
    date: '2024-07-10',
    status: 'on-leave',
    leaveType: 'personal',
    notes: 'Maternity leave',
    createdAt: '2024-07-10T00:00:00Z'
  }
];

// Mock Leave Requests
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    teacherId: '1',
    startDate: '2024-07-15',
    endDate: '2024-07-17',
    type: 'vacation',
    reason: 'Family vacation',
    status: 'pending',
    appliedDate: '2024-07-05'
  },
  {
    id: '2',
    teacherId: '2',
    startDate: '2024-07-20',
    endDate: '2024-07-20',
    type: 'sick',
    reason: 'Medical appointment',
    status: 'approved',
    appliedDate: '2024-07-18',
    approvedBy: 'admin',
    approvedDate: '2024-07-19'
  }
];

// Mock Salary Data
export const mockSalaries: Salary[] = [
  {
    id: '1',
    teacherId: '1',
    month: '2024-07',
    basicSalary: 75000,
    allowances: {
      housing: 5000,
      transport: 2000,
      medical: 1500,
      other: 500
    },
    deductions: {
      tax: 12000,
      insurance: 2000,
      providentFund: 3750,
      other: 0
    },
    grossSalary: 84000,
    netSalary: 66250,
    status: 'paid',
    paymentDate: '2024-07-01'
  }
];

// Mock Performance Data
export const mockPerformance: Performance[] = [
  {
    id: '1',
    teacherId: '1',
    reviewPeriod: '2024-06',
    metrics: {
      studentFeedback: 4.5,
      punctuality: 4.8,
      lessonPlanning: 4.6,
      classroomManagement: 4.4,
      communication: 4.7
    },
    overallRating: 4.6,
    goals: ['Improve student engagement', 'Develop new teaching methods'],
    achievements: ['Completed advanced training', 'Mentored new teachers'],
    areasForImprovement: ['Time management', 'Technology integration'],
    reviewerComments: 'Excellent performance overall. Shows great dedication.',
    reviewerId: 'admin',
    reviewDate: '2024-06-30',
    nextReviewDate: '2024-12-30'
  }
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Science',
    headOfDepartment: '2',
    teacherCount: 2,
    budget: 150000,
    description: 'Mathematics, Physics, Chemistry, Biology'
  },
  {
    id: '2',
    name: 'Arts',
    headOfDepartment: '3',
    teacherCount: 2,
    budget: 100000,
    description: 'English, History, Literature, Creative Writing'
  },
  {
    id: '3',
    name: 'Technology',
    headOfDepartment: '4',
    teacherCount: 1,
    budget: 120000,
    description: 'Computer Science, Programming, IT'
  }
];

// Mock Attendance Trends
export const mockAttendanceTrends: AttendanceTrend[] = [
  { date: '2024-07-01', present: 4, absent: 1, late: 0, onLeave: 0 },
  { date: '2024-07-02', present: 5, absent: 0, late: 0, onLeave: 0 },
  { date: '2024-07-03', present: 4, absent: 0, late: 1, onLeave: 0 },
  { date: '2024-07-04', present: 3, absent: 1, late: 0, onLeave: 1 },
  { date: '2024-07-05', present: 4, absent: 0, late: 1, onLeave: 0 },
  { date: '2024-07-08', present: 5, absent: 0, late: 0, onLeave: 0 },
  { date: '2024-07-09', present: 4, absent: 1, late: 0, onLeave: 0 },
  { date: '2024-07-10', present: 2, absent: 1, late: 1, onLeave: 1 }
];

// Mock Salary Breakdown
export const mockSalaryBreakdown: SalaryBreakdown[] = [
  {
    department: 'Science',
    totalSalary: 157000,
    teacherCount: 2,
    averageSalary: 78500
  },
  {
    department: 'Arts',
    totalSalary: 139000,
    teacherCount: 2,
    averageSalary: 69500
  },
  {
    department: 'Technology',
    totalSalary: 72000,
    teacherCount: 1,
    averageSalary: 72000
  }
];

// Utility function to initialize mock data
export const initializeMockData = () => {
  return {
    teachers: mockTeachers,
    attendance: mockAttendance,
    leaveRequests: mockLeaveRequests,
    salaries: mockSalaries,
    performance: mockPerformance,
    departments: mockDepartments,
    attendanceTrends: mockAttendanceTrends,
    salaryBreakdown: mockSalaryBreakdown
  };
};