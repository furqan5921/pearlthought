"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAttendanceTrends } from "@/lib/mock-data";
import { useAttendanceStore, useTeacherStore } from "@/lib/store";
import {
  Award,
  BookOpen,
  DollarSign,
  Download,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

export function AnalyticsSection() {
  const { teachers } = useTeacherStore();
  const { attendance } = useAttendanceStore();
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("overview");

  // Calculate key metrics
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter((t) => t.status === "active").length;
  const averageSalary =
    teachers.length > 0
      ? teachers.reduce((sum, t) => sum + t.salary, 0) / teachers.length
      : 0;
  const averageExperience =
    teachers.length > 0
      ? teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length
      : 0;
  const averagePerformance =
    teachers.length > 0
      ? teachers.reduce((sum, t) => sum + (t.performanceRating || 0), 0) /
        teachers.length
      : 0;

  // Department analytics
  const departmentAnalytics = Array.from(
    new Set(teachers.map((t) => t.department))
  ).map((dept) => {
    const deptTeachers = teachers.filter((t) => t.department === dept);
    return {
      department: dept,
      count: deptTeachers.length,
      avgSalary:
        deptTeachers.reduce((sum, t) => sum + t.salary, 0) /
        deptTeachers.length,
      avgExperience:
        deptTeachers.reduce((sum, t) => sum + t.experience, 0) /
        deptTeachers.length,
      avgPerformance:
        deptTeachers.reduce((sum, t) => sum + (t.performanceRating || 0), 0) /
        deptTeachers.length,
    };
  });

  // Experience distribution
  const experienceDistribution = [
    {
      range: "0-2 years",
      count: teachers.filter((t) => t.experience <= 2).length,
    },
    {
      range: "3-5 years",
      count: teachers.filter((t) => t.experience >= 3 && t.experience <= 5)
        .length,
    },
    {
      range: "6-10 years",
      count: teachers.filter((t) => t.experience >= 6 && t.experience <= 10)
        .length,
    },
    {
      range: "10+ years",
      count: teachers.filter((t) => t.experience > 10).length,
    },
  ];

  // Salary distribution
  const salaryDistribution = [
    {
      range: "$60K-$70K",
      count: teachers.filter((t) => t.salary >= 60000 && t.salary < 70000)
        .length,
    },
    {
      range: "$70K-$80K",
      count: teachers.filter((t) => t.salary >= 70000 && t.salary < 80000)
        .length,
    },
    { range: "$80K+", count: teachers.filter((t) => t.salary >= 80000).length },
  ];

  // Performance trends (mock data)
  const performanceTrends = [
    { month: "Jan", performance: 4.2, attendance: 92, satisfaction: 85 },
    { month: "Feb", performance: 4.3, attendance: 94, satisfaction: 87 },
    { month: "Mar", performance: 4.4, attendance: 91, satisfaction: 89 },
    { month: "Apr", performance: 4.3, attendance: 93, satisfaction: 86 },
    { month: "May", performance: 4.5, attendance: 95, satisfaction: 91 },
    { month: "Jun", performance: 4.6, attendance: 96, satisfaction: 93 },
    { month: "Jul", performance: 4.4, attendance: 94, satisfaction: 90 },
  ];

  // Hiring trends
  const hiringTrends = [
    { year: "2020", hired: 2, left: 0 },
    { year: "2021", hired: 1, left: 1 },
    { year: "2022", hired: 2, left: 0 },
    { year: "2023", hired: 0, left: 1 },
    { year: "2024", hired: 1, left: 0 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Comprehensive insights and data analysis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
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
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Performance
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averagePerformance.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(averageSalary / 1000)}K
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+3%</span> from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Experience
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageExperience.toFixed(1)} yrs
            </div>
            <p className="text-xs text-muted-foreground">Teaching experience</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Retention Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">96%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2%</span> from last year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs
        value={selectedMetric}
        onValueChange={setSelectedMetric}
        className="space-y-4 sm:space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm py-2">
            Performance
          </TabsTrigger>
          <TabsTrigger value="demographics" className="text-xs sm:text-sm py-2">
            Demographics
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="text-xs sm:text-sm py-2 hidden sm:block"
          >
            Financial
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="text-xs sm:text-sm py-2 hidden sm:block"
          >
            Trends
          </TabsTrigger>
        </TabsList>

        {/* Mobile-only additional tabs */}
        <div className="sm:hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="financial" className="text-xs py-2">
              Financial
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs py-2">
              Trends
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Department Overview */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Department Overview
                </CardTitle>
                <CardDescription className="text-sm">
                  Teacher distribution and metrics by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departmentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="department"
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" name="Teachers" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Attendance Overview */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Attendance Trends
                </CardTitle>
                <CardDescription className="text-sm">
                  Daily attendance patterns
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
                    <Tooltip />
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
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Performance Trends */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Performance Trends
                </CardTitle>
                <CardDescription className="text-sm">
                  Monthly performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis yAxisId="left" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" fontSize={12} />
                    <Tooltip />
                    <Bar
                      yAxisId="left"
                      dataKey="attendance"
                      fill="#3B82F6"
                      name="Attendance %"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="performance"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Performance"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Department Performance
                </CardTitle>
                <CardDescription className="text-sm">
                  Average performance ratings by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departmentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" fontSize={12} />
                    <YAxis domain={[0, 5]} fontSize={12} />
                    <Tooltip />
                    <Bar
                      dataKey="avgPerformance"
                      fill="#10B981"
                      name="Avg Performance"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Experience Distribution */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Experience Distribution
                </CardTitle>
                <CardDescription className="text-sm">
                  Teachers by years of experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={experienceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {experienceDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Distribution */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Department Distribution
                </CardTitle>
                <CardDescription className="text-sm">
                  Teacher count by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={departmentAnalytics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ department, count }) =>
                        `${department}: ${count}`
                      }
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {departmentAnalytics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Salary Distribution */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Salary Distribution
                </CardTitle>
                <CardDescription className="text-sm">
                  Teachers by salary range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salaryDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#F59E0B" name="Teachers" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Salary Comparison */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Department Salary Comparison
                </CardTitle>
                <CardDescription className="text-sm">
                  Average salary by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departmentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" fontSize={12} />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}K`
                      }
                      fontSize={12}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Avg Salary",
                      ]}
                    />
                    <Bar dataKey="avgSalary" fill="#10B981" name="Avg Salary" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Hiring Trends */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Hiring Trends
                </CardTitle>
                <CardDescription className="text-sm">
                  New hires vs departures by year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={hiringTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="hired" fill="#10B981" name="Hired" />
                    <Bar dataKey="left" fill="#EF4444" name="Left" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance vs Experience */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  Performance vs Experience
                </CardTitle>
                <CardDescription className="text-sm">
                  Correlation between experience and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={departmentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="avgExperience"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      name="Avg Experience"
                    />
                    <Area
                      type="monotone"
                      dataKey="avgPerformance"
                      stackId="2"
                      stroke="#10B981"
                      fill="#10B981"
                      name="Avg Performance"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Key Insights</CardTitle>
            <CardDescription className="text-sm">
              Data-driven observations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-green-900 text-sm sm:text-base">
                  Performance Improvement
                </p>
                <p className="text-xs sm:text-sm text-green-700">
                  Average performance rating increased by 0.2 points this
                  quarter
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-blue-900 text-sm sm:text-base">
                  High Retention
                </p>
                <p className="text-xs sm:text-sm text-blue-700">
                  96% retention rate indicates strong job satisfaction
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-yellow-900 text-sm sm:text-base">
                  Experience Gap
                </p>
                <p className="text-xs sm:text-sm text-yellow-700">
                  Consider hiring more senior teachers to balance experience
                  levels
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">
              Recommendations
            </CardTitle>
            <CardDescription className="text-sm">
              Actionable next steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base">
                  Recognition Program
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Implement teacher of the month program to boost morale
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base">
                  Professional Development
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Increase training budget for technology integration
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 border rounded-lg">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base">
                  Salary Review
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Consider salary adjustments for high performers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
