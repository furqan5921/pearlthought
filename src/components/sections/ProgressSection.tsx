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
import { useTeacherStore } from "@/lib/store";
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle,
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ProgressSection() {
  const { teachers } = useTeacherStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");

  // Get unique departments
  const departments = Array.from(new Set(teachers.map((t) => t.department)));

  // Calculate performance statistics
  const averageRating =
    teachers.length > 0
      ? teachers.reduce((sum, t) => sum + (t.performanceRating || 0), 0) /
        teachers.length
      : 0;

  const excellentPerformers = teachers.filter(
    (t) => (t.performanceRating || 0) >= 4.5
  ).length;
  const goodPerformers = teachers.filter(
    (t) => (t.performanceRating || 0) >= 4.0 && (t.performanceRating || 0) < 4.5
  ).length;
  const needsImprovement = teachers.filter(
    (t) => (t.performanceRating || 0) < 4.0
  ).length;

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || teacher.department === departmentFilter;

    let matchesPerformance = true;
    if (performanceFilter === "excellent") {
      matchesPerformance = (teacher.performanceRating || 0) >= 4.5;
    } else if (performanceFilter === "good") {
      matchesPerformance =
        (teacher.performanceRating || 0) >= 4.0 &&
        (teacher.performanceRating || 0) < 4.5;
    } else if (performanceFilter === "needs-improvement") {
      matchesPerformance = (teacher.performanceRating || 0) < 4.0;
    }

    return matchesSearch && matchesDepartment && matchesPerformance;
  });

  // Mock performance data for charts
  const performanceMetrics = [
    { subject: "Student Feedback", value: 4.5, fullMark: 5 },
    { subject: "Punctuality", value: 4.8, fullMark: 5 },
    { subject: "Lesson Planning", value: 4.6, fullMark: 5 },
    { subject: "Classroom Management", value: 4.4, fullMark: 5 },
    { subject: "Communication", value: 4.7, fullMark: 5 },
    { subject: "Innovation", value: 4.2, fullMark: 5 },
  ];

  const departmentPerformance = departments.map((dept) => {
    const deptTeachers = teachers.filter((t) => t.department === dept);
    const avgRating =
      deptTeachers.length > 0
        ? deptTeachers.reduce((sum, t) => sum + (t.performanceRating || 0), 0) /
          deptTeachers.length
        : 0;
    return {
      department: dept,
      rating: Number(avgRating.toFixed(1)),
      teachers: deptTeachers.length,
    };
  });

  const monthlyProgress = [
    { month: "Jan", rating: 4.2 },
    { month: "Feb", rating: 4.3 },
    { month: "Mar", rating: 4.4 },
    { month: "Apr", rating: 4.3 },
    { month: "May", rating: 4.5 },
    { month: "Jun", rating: 4.6 },
    { month: "Jul", rating: 4.4 },
  ];

  const getPerformanceBadge = (rating: number) => {
    if (rating >= 4.5)
      return {
        variant: "default" as const,
        label: "Excellent",
        color: "text-green-600",
      };
    if (rating >= 4.0)
      return {
        variant: "secondary" as const,
        label: "Good",
        color: "text-blue-600",
      };
    if (rating >= 3.5)
      return {
        variant: "outline" as const,
        label: "Average",
        color: "text-yellow-600",
      };
    return {
      variant: "destructive" as const,
      label: "Needs Improvement",
      color: "text-red-600",
    };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
            Teacher Progress
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Track performance metrics and professional development
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <FileText className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Generate Report</span>
            <span className="sm:hidden">Report</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">New Review</span>
            <span className="sm:hidden">Review</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Excellent</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {excellentPerformers}
            </div>
            <p className="text-xs text-muted-foreground">4.5+ rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {goodPerformers}
            </div>
            <p className="text-xs text-muted-foreground">4.0-4.4 rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Support</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {needsImprovement}
            </div>
            <p className="text-xs text-muted-foreground">Below 4.0 rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Performance Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Average scores across key performance areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average ratings by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="rating" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Progress Trend</CardTitle>
          <CardDescription>
            Overall performance trend over the past 7 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Teacher Performance List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Individual Performance</CardTitle>
              <CardDescription>
                Detailed performance metrics for each teacher
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={performanceFilter}
              onValueChange={setPerformanceFilter}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="excellent">Excellent (4.5+)</SelectItem>
                <SelectItem value="good">Good (4.0-4.4)</SelectItem>
                <SelectItem value="needs-improvement">
                  Needs Improvement (&lt;4.0)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Performance List */}
          <div className="space-y-4">
            {filteredTeachers.map((teacher) => {
              const badge = getPerformanceBadge(teacher.performanceRating || 0);

              return (
                <div
                  key={teacher.id}
                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4"
                >
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback>
                        {teacher.firstName[0]}
                        {teacher.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-base sm:text-lg truncate">
                        {teacher.firstName} {teacher.lastName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {teacher.employeeId} • {teacher.department} •{" "}
                        {teacher.experience} years exp.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="grid grid-cols-3 sm:flex sm:items-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Current Rating
                        </p>
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-sm sm:text-base">
                            {(teacher.performanceRating || 0).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Last Review
                        </p>
                        <p className="font-medium text-xs sm:text-sm">
                          {teacher.lastReviewDate
                            ? new Date(
                                teacher.lastReviewDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Status
                        </p>
                        <Badge
                          variant={badge.variant}
                          className={`${badge.color} text-xs`}
                        >
                          {badge.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Target className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No performance records found
              </h3>
              <p className="text-gray-500">
                No teachers match your current search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goals and Development */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Development Goals</CardTitle>
            <CardDescription>
              Active professional development objectives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Improve Student Engagement</p>
                <p className="text-sm text-gray-500">
                  Target: 4.8/5.0 by Dec 2024
                </p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Technology Integration</p>
                <p className="text-sm text-gray-500">
                  Complete digital tools training
                </p>
              </div>
              <Badge variant="outline">Planned</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mentorship Program</p>
                <p className="text-sm text-gray-500">Mentor 2 new teachers</p>
              </div>
              <Badge variant="default">Completed</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>
              Notable accomplishments and recognitions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Teacher of the Month</p>
                <p className="text-sm text-gray-500">
                  Sarah Johnson - July 2024
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Training Completion</p>
                <p className="text-sm text-gray-500">
                  Advanced Teaching Methods - 5 teachers
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Performance Milestone</p>
                <p className="text-sm text-gray-500">
                  Department average above 4.5
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
