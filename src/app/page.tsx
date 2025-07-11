'use client';

import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { useTeacherStore } from '@/lib/store';
import { initializeMockData } from '@/lib/mock-data';

export default function Home() {
  const { setTeachers } = useTeacherStore();

  // Initialize with mock data on first load
  useEffect(() => {
    const mockData = initializeMockData();
    setTeachers(mockData.teachers);
  }, [setTeachers]);

  return (
    <MainLayout>
      <DashboardHome />
    </MainLayout>
  );
}
