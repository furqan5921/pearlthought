"use client";

import { useState, useEffect, useCallback } from "react";
import { Teacher, TeacherFilters, TeacherStats } from "@/types/teacher";
import { storage, initializeSampleData } from "@/lib/storage";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TeacherFilters>({
    search: "",
    department: "",
    subject: "",
    status: "all",
  });

  // Load teachers from storage
  const loadTeachers = useCallback(() => {
    setLoading(true);
    try {
      initializeSampleData();
      const loadedTeachers = storage.getTeachers();
      setTeachers(loadedTeachers);
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new teacher
  const addTeacher = useCallback((teacherData: Omit<Teacher, "id" | "status">) => {
    try {
      const newTeacher = storage.addTeacher(teacherData);
      setTeachers(prev => [...prev, newTeacher]);
      return newTeacher;
    } catch (error) {
      console.error("Error adding teacher:", error);
      throw error;
    }
  }, []);

  // Update a teacher
  const updateTeacher = useCallback((id: string, updates: Partial<Teacher>) => {
    try {
      const updatedTeacher = storage.updateTeacher(id, updates);
      if (updatedTeacher) {
        setTeachers(prev => 
          prev.map(teacher => 
            teacher.id === id ? updatedTeacher : teacher
          )
        );
        return updatedTeacher;
      }
      return null;
    } catch (error) {
      console.error("Error updating teacher:", error);
      throw error;
    }
  }, []);

  // Delete a teacher
  const deleteTeacher = useCallback((id: string) => {
    try {
      const success = storage.deleteTeacher(id);
      if (success) {
        setTeachers(prev => prev.filter(teacher => teacher.id !== id));
      }
      return success;
    } catch (error) {
      console.error("Error deleting teacher:", error);
      throw error;
    }
  }, []);

  // Filter teachers based on current filters
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesDepartment = !filters.department || teacher.department === filters.department;
    const matchesSubject = !filters.subject || teacher.subject === filters.subject;
    const matchesStatus = filters.status === "all" || teacher.status === filters.status;

    return matchesSearch && matchesDepartment && matchesSubject && matchesStatus;
  });

  // Get teacher statistics
  const getStats = useCallback((): TeacherStats => {
    const total = teachers.length;
    const active = teachers.filter(t => t.status === "active").length;
    const inactive = teachers.filter(t => t.status === "inactive").length;
    const departments = new Set(teachers.map(t => t.department)).size;

    return { total, active, inactive, departments };
  }, [teachers]);

  // Get unique departments
  const getDepartments = useCallback(() => {
    return Array.from(new Set(teachers.map(t => t.department))).sort();
  }, [teachers]);

  // Get unique subjects
  const getSubjects = useCallback(() => {
    return Array.from(new Set(teachers.map(t => t.subject))).sort();
  }, [teachers]);

  // Initialize data on mount
  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  return {
    teachers: filteredTeachers,
    allTeachers: teachers,
    loading,
    filters,
    setFilters,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    loadTeachers,
    getStats,
    getDepartments,
    getSubjects,
  };
};