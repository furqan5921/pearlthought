'use client';

import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SalarySection } from '@/components/sections/SalarySection';
import { useTeacherStore } from '@/lib/store';
import { initializeMockData } from '@/lib/mock-data';

export default function SalaryPage() {
  const { setTeachers } = useTeacherStore();

  // Initialize with mock data on first load
  useEffect(() => {
    const mockData = initializeMockData();
    setTeachers(mockData.teachers);
  }, [setTeachers]);

  return (
    <MainLayout>
      <SalarySection />
    </MainLayout>
  );
}