'use client';

import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProgressSection } from '@/components/sections/ProgressSection';
import { useTeacherStore } from '@/lib/store';
import { initializeMockData } from '@/lib/mock-data';

export default function ProgressPage() {
  const { setTeachers } = useTeacherStore();

  // Initialize with mock data on first load
  useEffect(() => {
    const mockData = initializeMockData();
    setTeachers(mockData.teachers);
  }, [setTeachers]);

  return (
    <MainLayout>
      <ProgressSection />
    </MainLayout>
  );
}