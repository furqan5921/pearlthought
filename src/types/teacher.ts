export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  experience: number;
  qualification: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface TeacherFormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  experience: number;
  qualification: string;
  department: string;
  joinDate: string;
}

export interface TeacherFilters {
  search: string;
  department: string;
  subject: string;
  status: 'all' | 'active' | 'inactive';
}

export interface TeacherStats {
  total: number;
  active: number;
  inactive: number;
  departments: number;
}