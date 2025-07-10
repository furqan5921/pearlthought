import { Teacher } from "@/types/teacher";

const STORAGE_KEY = "teachers_data";

export const storage = {
  // Get all teachers from localStorage
  getTeachers: (): Teacher[] => {
    if (typeof window === "undefined") return [];
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading teachers from localStorage:", error);
      return [];
    }
  },

  // Save teachers to localStorage
  saveTeachers: (teachers: Teacher[]): void => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
    } catch (error) {
      console.error("Error saving teachers to localStorage:", error);
    }
  },

  // Add a new teacher
  addTeacher: (teacher: Omit<Teacher, "id" | "status">): Teacher => {
    const teachers = storage.getTeachers();
    const newTeacher: Teacher = {
      ...teacher,
      id: crypto.randomUUID(),
      status: "active",
    };
    
    const updatedTeachers = [...teachers, newTeacher];
    storage.saveTeachers(updatedTeachers);
    return newTeacher;
  },

  // Update an existing teacher
  updateTeacher: (id: string, updates: Partial<Teacher>): Teacher | null => {
    const teachers = storage.getTeachers();
    const index = teachers.findIndex(t => t.id === id);
    
    if (index === -1) return null;
    
    const updatedTeacher = { ...teachers[index], ...updates };
    teachers[index] = updatedTeacher;
    storage.saveTeachers(teachers);
    return updatedTeacher;
  },

  // Delete a teacher
  deleteTeacher: (id: string): boolean => {
    const teachers = storage.getTeachers();
    const filteredTeachers = teachers.filter(t => t.id !== id);
    
    if (filteredTeachers.length === teachers.length) return false;
    
    storage.saveTeachers(filteredTeachers);
    return true;
  },

  // Get teacher by ID
  getTeacherById: (id: string): Teacher | null => {
    const teachers = storage.getTeachers();
    return teachers.find(t => t.id === id) || null;
  },

  // Clear all data
  clearAll: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  const existingTeachers = storage.getTeachers();
  
  if (existingTeachers.length === 0) {
    const sampleTeachers: Teacher[] = [
      {
        id: "1",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@school.edu",
        subject: "Mathematics",
        phone: "+1 (555) 123-4567",
        experience: 8,
        qualification: "PhD in Mathematics",
        department: "Science",
        joinDate: "2020-08-15",
        status: "active",
      },
      {
        id: "2",
        name: "Prof. Michael Chen",
        email: "michael.chen@school.edu",
        subject: "Physics",
        phone: "+1 (555) 234-5678",
        experience: 12,
        qualification: "MSc in Physics",
        department: "Science",
        joinDate: "2018-01-10",
        status: "active",
      },
      {
        id: "3",
        name: "Ms. Emily Rodriguez",
        email: "emily.rodriguez@school.edu",
        subject: "English Literature",
        phone: "+1 (555) 345-6789",
        experience: 5,
        qualification: "MA in English Literature",
        department: "Arts",
        joinDate: "2022-09-01",
        status: "active",
      },
    ];
    
    storage.saveTeachers(sampleTeachers);
  }
};