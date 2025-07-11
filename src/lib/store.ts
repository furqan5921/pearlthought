import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  Attendance,
  AttendanceFilters,
  AttendanceTrend,
  DashboardMetrics,
  LeaveRequest,
  Notification,
  NotificationState,
  SalaryBreakdown,
  SidebarState,
  Teacher,
  TeacherFilters,
  User,
} from "./types";

// Teacher Store
interface TeacherStore {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  filters: TeacherFilters;
  loading: boolean;

  // Actions
  setTeachers: (teachers: Teacher[]) => void;
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  setFilters: (filters: Partial<TeacherFilters>) => void;
  setLoading: (loading: boolean) => void;

  // Computed
  getFilteredTeachers: () => Teacher[];
  getTeacherById: (id: string) => Teacher | undefined;
  getTeachersByDepartment: (department: string) => Teacher[];
}

export const useTeacherStore = create<TeacherStore>()(
  devtools(
    persist(
      (set, get) => ({
        teachers: [],
        selectedTeacher: null,
        filters: {
          search: "",
          department: "",
          status: "all",
          employmentType: "all",
          experience: { min: 0, max: 50 },
          salary: { min: 0, max: 200000 },
        },
        loading: false,

        setTeachers: (teachers) => set({ teachers }),

        addTeacher: (teacher) =>
          set((state) => ({ teachers: [...state.teachers, teacher] })),

        updateTeacher: (id, updates) =>
          set((state) => ({
            teachers: state.teachers.map((teacher) =>
              teacher.id === id ? { ...teacher, ...updates } : teacher
            ),
          })),

        deleteTeacher: (id) =>
          set((state) => ({
            teachers: state.teachers.filter((teacher) => teacher.id !== id),
          })),

        setSelectedTeacher: (teacher) => set({ selectedTeacher: teacher }),

        setFilters: (filters) =>
          set((state) => ({ filters: { ...state.filters, ...filters } })),

        setLoading: (loading) => set({ loading }),

        getFilteredTeachers: () => {
          const { teachers, filters } = get();
          return teachers.filter((teacher) => {
            const matchesSearch =
              teacher.firstName
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              teacher.lastName
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              teacher.email
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              teacher.employeeId
                .toLowerCase()
                .includes(filters.search.toLowerCase());

            const matchesDepartment =
              !filters.department || teacher.department === filters.department;
            const matchesStatus =
              filters.status === "all" || teacher.status === filters.status;
            const matchesEmploymentType =
              filters.employmentType === "all" ||
              teacher.employmentType === filters.employmentType;
            const matchesExperience =
              teacher.experience >= filters.experience.min &&
              teacher.experience <= filters.experience.max;
            const matchesSalary =
              teacher.salary >= filters.salary.min &&
              teacher.salary <= filters.salary.max;

            return (
              matchesSearch &&
              matchesDepartment &&
              matchesStatus &&
              matchesEmploymentType &&
              matchesExperience &&
              matchesSalary
            );
          });
        },

        getTeacherById: (id) =>
          get().teachers.find((teacher) => teacher.id === id),

        getTeachersByDepartment: (department) =>
          get().teachers.filter((teacher) => teacher.department === department),
      }),
      {
        name: "teacher-store",
        partialize: (state) => ({ teachers: state.teachers }),
      }
    )
  )
);

// Attendance Store
interface AttendanceStore {
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  filters: AttendanceFilters;
  loading: boolean;

  // Actions
  setAttendance: (attendance: Attendance[]) => void;
  addAttendance: (attendance: Attendance) => void;
  updateAttendance: (id: string, updates: Partial<Attendance>) => void;
  setLeaveRequests: (requests: LeaveRequest[]) => void;
  addLeaveRequest: (request: LeaveRequest) => void;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => void;
  setFilters: (filters: Partial<AttendanceFilters>) => void;
  setLoading: (loading: boolean) => void;

  // Computed
  getAttendanceByTeacher: (teacherId: string) => Attendance[];
  getAttendanceByDate: (date: string) => Attendance[];
  getPendingLeaveRequests: () => LeaveRequest[];
  getAttendanceRate: (teacherId?: string) => number;
}

export const useAttendanceStore = create<AttendanceStore>()(
  devtools(
    persist(
      (set, get) => ({
        attendance: [],
        leaveRequests: [],
        filters: {
          dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            end: new Date().toISOString().split("T")[0],
          },
          status: "all",
          department: "",
        },
        loading: false,

        setAttendance: (attendance) => set({ attendance }),

        addAttendance: (attendance) =>
          set((state) => ({ attendance: [...state.attendance, attendance] })),

        updateAttendance: (id, updates) =>
          set((state) => ({
            attendance: state.attendance.map((record) =>
              record.id === id ? { ...record, ...updates } : record
            ),
          })),

        setLeaveRequests: (requests) => set({ leaveRequests: requests }),

        addLeaveRequest: (request) =>
          set((state) => ({
            leaveRequests: [...state.leaveRequests, request],
          })),

        updateLeaveRequest: (id, updates) =>
          set((state) => ({
            leaveRequests: state.leaveRequests.map((request) =>
              request.id === id ? { ...request, ...updates } : request
            ),
          })),

        setFilters: (filters) =>
          set((state) => ({ filters: { ...state.filters, ...filters } })),

        setLoading: (loading) => set({ loading }),

        getAttendanceByTeacher: (teacherId) =>
          get().attendance.filter((record) => record.teacherId === teacherId),

        getAttendanceByDate: (date) =>
          get().attendance.filter((record) => record.date === date),

        getPendingLeaveRequests: () =>
          get().leaveRequests.filter((request) => request.status === "pending"),

        getAttendanceRate: (teacherId) => {
          const { attendance } = get();
          const records = teacherId
            ? attendance.filter((record) => record.teacherId === teacherId)
            : attendance;

          if (records.length === 0) return 0;

          const presentRecords = records.filter(
            (record) => record.status === "present" || record.status === "late"
          );

          return (presentRecords.length / records.length) * 100;
        },
      }),
      {
        name: "attendance-store",
        partialize: (state) => ({
          attendance: state.attendance,
          leaveRequests: state.leaveRequests,
        }),
      }
    )
  )
);

// Dashboard Store
interface DashboardStore {
  metrics: DashboardMetrics;
  attendanceTrends: AttendanceTrend[];
  salaryBreakdown: SalaryBreakdown[];
  loading: boolean;

  // Actions
  setMetrics: (metrics: DashboardMetrics) => void;
  setAttendanceTrends: (trends: AttendanceTrend[]) => void;
  setSalaryBreakdown: (breakdown: SalaryBreakdown[]) => void;
  setLoading: (loading: boolean) => void;
  refreshDashboard: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  devtools((set, get) => ({
    metrics: {
      totalTeachers: 0,
      activeTeachers: 0,
      attendanceRate: 0,
      averageSalary: 0,
      pendingLeaveRequests: 0,
      upcomingReviews: 0,
    },
    attendanceTrends: [],
    salaryBreakdown: [],
    loading: false,

    setMetrics: (metrics) => set({ metrics }),
    setAttendanceTrends: (trends) => set({ attendanceTrends: trends }),
    setSalaryBreakdown: (breakdown) => set({ salaryBreakdown: breakdown }),
    setLoading: (loading) => set({ loading }),

    refreshDashboard: () => {
      // This would typically fetch data from API
      const teacherStore = useTeacherStore.getState();
      const attendanceStore = useAttendanceStore.getState();

      const metrics: DashboardMetrics = {
        totalTeachers: teacherStore.teachers.length,
        activeTeachers: teacherStore.teachers.filter(
          (t) => t.status === "active"
        ).length,
        attendanceRate: attendanceStore.getAttendanceRate(),
        averageSalary:
          teacherStore.teachers.reduce((sum, t) => sum + t.salary, 0) /
            teacherStore.teachers.length || 0,
        pendingLeaveRequests: attendanceStore.getPendingLeaveRequests().length,
        upcomingReviews: 0, // Would be calculated based on review dates
      };

      set({ metrics });
    },
  }))
);

// UI Store
interface UIStore {
  sidebar: SidebarState;
  notifications: NotificationState;
  theme: "light" | "dark";

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveSection: (section: string) => void;
  addNotification: (notification: Omit<Notification, "id">) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (set, get) => ({
        sidebar: {
          isCollapsed: false,
          activeSection: "dashboard",
        },
        notifications: {
          notifications: [],
          unreadCount: 0,
        },
        theme: "light",

        toggleSidebar: () =>
          set((state) => ({
            sidebar: {
              ...state.sidebar,
              isCollapsed: !state.sidebar.isCollapsed,
            },
          })),

        setSidebarCollapsed: (collapsed) =>
          set((state) => ({
            sidebar: { ...state.sidebar, isCollapsed: collapsed },
          })),

        setActiveSection: (section) =>
          set((state) => ({
            sidebar: { ...state.sidebar, activeSection: section },
          })),

        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: crypto.randomUUID(),
            read: false,
          };

          set((state) => ({
            notifications: {
              notifications: [
                newNotification,
                ...state.notifications.notifications,
              ],
              unreadCount: state.notifications.unreadCount + 1,
            },
          }));
        },

        markNotificationAsRead: (id) =>
          set((state) => ({
            notifications: {
              notifications: state.notifications.notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
              ),
              unreadCount: Math.max(0, state.notifications.unreadCount - 1),
            },
          })),

        clearNotifications: () =>
          set({
            notifications: {
              notifications: [],
              unreadCount: 0,
            },
          }),

        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
      }),
      {
        name: "ui-store",
        partialize: (state) => ({
          sidebar: state.sidebar,
          theme: state.theme,
        }),
      }
    )
  )
);

// Auth Store (for future use)
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: async (email, password) => {
      set({ loading: true });
      // Mock login - replace with actual auth logic
      setTimeout(() => {
        const mockUser: User = {
          id: "1",
          name: "Admin User",
          email,
          role: "admin",
          permissions: [],
          institutionId: "1",
        };
        set({ user: mockUser, isAuthenticated: true, loading: false });
      }, 1000);
    },

    logout: () => set({ user: null, isAuthenticated: false }),

    setLoading: (loading) => set({ loading }),
  }))
);
