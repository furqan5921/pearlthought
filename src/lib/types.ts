// Core Entity Types
export interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth: string;
  hireDate: string;
  
  // Professional Information
  department: string;
  subject: string[];
  qualification: string;
  experience: number;
  salary: number;
  employmentType: 'full-time' | 'part-time' | 'contract';
  status: 'active' | 'inactive' | 'on-leave';
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  
  // Documents
  documents: Document[];
  
  // Performance
  performanceRating: number; // 1-5
  lastReviewDate: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'certificate' | 'contract' | 'id' | 'resume' | 'other';
  url: string;
  uploadDate: string;
  expiryDate?: string;
  size: number;
}

export interface Attendance {
  id: string;
  teacherId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  leaveType?: 'sick' | 'personal' | 'vacation' | 'emergency';
  notes?: string;
  approvedBy?: string;
  createdAt: string;
}

export interface LeaveRequest {
  id: string;
  teacherId: string;
  startDate: string;
  endDate: string;
  type: 'sick' | 'personal' | 'vacation' | 'emergency' | 'maternity' | 'paternity';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  documents?: string[];
}

export interface Salary {
  id: string;
  teacherId: string;
  month: string; // YYYY-MM format
  basicSalary: number;
  allowances: {
    housing: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    providentFund: number;
    other: number;
  };
  grossSalary: number;
  netSalary: number;
  paymentDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  payslipUrl?: string;
}

export interface Performance {
  id: string;
  teacherId: string;
  reviewPeriod: string; // YYYY-MM format
  metrics: {
    studentFeedback: number; // 1-5
    punctuality: number; // 1-5
    lessonPlanning: number; // 1-5
    classroomManagement: number; // 1-5
    communication: number; // 1-5
  };
  overallRating: number; // 1-5
  goals: string[];
  achievements: string[];
  areasForImprovement: string[];
  reviewerComments: string;
  reviewerId: string;
  reviewDate: string;
  nextReviewDate: string;
}

export interface Department {
  id: string;
  name: string;
  headOfDepartment?: string;
  teacherCount: number;
  budget: number;
  description: string;
}

export interface Institution {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  establishedYear: number;
  type: 'school' | 'college' | 'university' | 'institute';
}

// Dashboard Types
export interface DashboardMetrics {
  totalTeachers: number;
  activeTeachers: number;
  attendanceRate: number;
  averageSalary: number;
  pendingLeaveRequests: number;
  upcomingReviews: number;
}

export interface AttendanceTrend {
  date: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}

export interface SalaryBreakdown {
  department: string;
  totalSalary: number;
  teacherCount: number;
  averageSalary: number;
}

// Filter and Search Types
export interface TeacherFilters {
  search: string;
  department: string;
  status: 'all' | 'active' | 'inactive' | 'on-leave';
  employmentType: 'all' | 'full-time' | 'part-time' | 'contract';
  experience: {
    min: number;
    max: number;
  };
  salary: {
    min: number;
    max: number;
  };
}

export interface AttendanceFilters {
  dateRange: {
    start: string;
    end: string;
  };
  status: 'all' | 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  department: string;
}

// UI State Types
export interface SidebarState {
  isCollapsed: boolean;
  activeSection: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// User and Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'department-head' | 'teacher';
  avatar?: string;
  permissions: Permission[];
  institutionId: string;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface TeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  hireDate: string;
  department: string;
  subject: string[];
  qualification: string;
  experience: number;
  salary: number;
  employmentType: 'full-time' | 'part-time' | 'contract';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface AttendanceFormData {
  teacherId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  notes?: string;
}

export interface LeaveRequestFormData {
  startDate: string;
  endDate: string;
  type: 'sick' | 'personal' | 'vacation' | 'emergency' | 'maternity' | 'paternity';
  reason: string;
}