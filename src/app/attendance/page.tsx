'use client';

import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AttendanceSection } from '@/components/sections/AttendanceSection';
import { useTeacherStore, useAttendanceStore } from '@/lib/store';
import { initializeMockData } from '@/lib/mock-data';

export default function AttendancePage() {
  const { setTeachers } = useTeacherStore();
  const { setAttendance, setLeaveRequests } = useAttendanceStore();

  // Initialize with mock data on first load
  useEffect(() => {
    const mockData = initializeMockData();
    setTeachers(mockData.teachers);
    setAttendance(mockData.attendance);
    setLeaveRequests(mockData.leaveRequests);
  }, [setTeachers, setAttendance, setLeaveRequests]);

  return (
    <MainLayout>
      <AttendanceSection />
    </MainLayout>
  );
}