'use client';

import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AnalyticsSection } from '@/components/sections/AnalyticsSection';
import { useTeacherStore, useAttendanceStore } from '@/lib/store';
import { initializeMockData } from '@/lib/mock-data';

export default function AnalyticsPage() {
  const { setTeachers } = useTeacherStore();
  const { setAttendance } = useAttendanceStore();

  // Initialize with mock data on first load
  useEffect(() => {
    const mockData = initializeMockData();
    setTeachers(mockData.teachers);
    setAttendance(mockData.attendance);
  }, [setTeachers, setAttendance]);

  return (
    <MainLayout>
      <AnalyticsSection />
    </MainLayout>
  );
}