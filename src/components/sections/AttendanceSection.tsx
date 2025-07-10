"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAttendanceTrends } from "@/lib/mock-data";
import { useAttendanceStore, useTeacherStore } from "@/lib/store";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Search,
  UserCheck,
  UserX,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function AttendanceSection() {
  const { teachers } = useTeacherStore();
  const {
    attendance,
    leaveRequests,
    getAttendanceByDate,
    getPendingLeaveRequests,
  } = useAttendanceStore();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get today's attendance
  const todayAttendance = getAttendanceByDate(selectedDate);
  const pendingRequests = getPendingLeaveRequests();

  // Calculate stats
  const totalTeachers = teachers.length;
  const presentToday = todayAttendance.filter(
    (a) => a.status === "present"
  ).length;
  const absentToday = todayAttendance.filter(
    (a) => a.status === "absent"
  ).length;
  const lateToday = todayAttendance.filter((a) => a.status === "late").length;
  const onLeaveToday = todayAttendance.filter(
    (a) => a.status === "on-leave"
  ).length;

  // Filter attendance records
  const filteredAttendance = todayAttendance.filter((record) => {
    const teacher = teachers.find((t) => t.id === record.teacherId);
    if (!teacher) return false;

    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "on-leave":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4" />;
      case "absent":
        return <XCircle className="w-4 h-4" />;
      case "late":
        return <Clock className="w-4 h-4" />;
      case "on-leave":
        return <Calendar className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
            Attendance
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Track and manage teacher attendance records
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Mark Attendance</span>
            <span className="sm:hidden">Mark</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-muted-foreground">Staff members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {presentToday}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalTeachers > 0
                ? Math.round((presentToday / totalTeachers) * 100)
                : 0}
              % attendance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentToday}</div>
            <p className="text-xs text-muted-foreground">Not present today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {lateToday}
            </div>
            <p className="text-xs text-muted-foreground">Arrived late</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {onLeaveToday}
            </div>
            <p className="text-xs text-muted-foreground">Approved leave</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Attendance Chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">
              Attendance Trend
            </CardTitle>
            <CardDescription className="text-sm">
              Daily attendance for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockAttendanceTrends.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Present"
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Absent"
                />
                <Line
                  type="monotone"
                  dataKey="late"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="Late"
                />
                <Line
                  type="monotone"
                  dataKey="onLeave"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="On Leave"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Leave Requests */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">
              Pending Leave Requests
            </CardTitle>
            <CardDescription className="text-sm">
              {pendingRequests.length} requests awaiting approval
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {pendingRequests.slice(0, 5).map((request) => {
              const teacher = teachers.find((t) => t.id === request.teacherId);
              return (
                <div
                  key={request.id}
                  className="flex items-center justify-between gap-3 p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarImage src={teacher?.avatar} />
                      <AvatarFallback className="text-xs">
                        {teacher?.firstName[0]}
                        {teacher?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-xs sm:text-sm truncate">
                        {teacher?.firstName} {teacher?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {new Date(request.startDate).toLocaleDateString()} -{" "}
                        {new Date(request.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {request.type}
                  </Badge>
                </div>
              );
            })}
            {pendingRequests.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No pending requests
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <CardTitle className="text-lg sm:text-xl">
                Daily Attendance
              </CardTitle>
              <CardDescription className="text-sm">
                Attendance records for{" "}
                {new Date(selectedDate).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-40"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Attendance List */}
          <div className="space-y-3">
            {filteredAttendance.map((record) => {
              const teacher = teachers.find((t) => t.id === record.teacherId);
              if (!teacher) return null;

              return (
                <div
                  key={record.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback className="text-sm">
                        {teacher.firstName[0]}
                        {teacher.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">
                        {teacher.firstName} {teacher.lastName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {teacher.employeeId} • {teacher.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                      {record.checkIn && (
                        <div>
                          <span className="text-gray-500">In: </span>
                          <span className="font-medium">{record.checkIn}</span>
                        </div>
                      )}
                      {record.checkOut && (
                        <div>
                          <span className="text-gray-500">Out: </span>
                          <span className="font-medium">{record.checkOut}</span>
                        </div>
                      )}
                    </div>
                    <Badge className={getStatusColor(record.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(record.status)}
                        <span className="capitalize text-xs">
                          {record.status}
                        </span>
                      </div>
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAttendance.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No attendance records
              </h3>
              <p className="text-sm text-gray-500">
                No attendance records found for the selected date and filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
