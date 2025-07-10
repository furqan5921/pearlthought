'use client';

import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TeachersSection } from '@/components/sections/TeachersSection';
import { useTeacherStore } from '@/lib/store';
import { initializeMockData } from '@/lib/mock-data';

export default function TeachersPage() {
  const { setTeachers } = useTeacherStore();

  // Initialize with mock data on first load
  useEffect(() => {
    const mockData = initializeMockData();
    setTeachers(mockData.teachers);
  }, [setTeachers]);

  return (
    <MainLayout>
      <TeachersSection />
    </MainLayout>
  );
}