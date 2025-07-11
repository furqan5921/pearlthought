"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { mockSalaryBreakdown } from "@/lib/mock-data";
import { useTeacherStore } from "@/lib/store";
import { Teacher } from "@/lib/types";
import {
  Calculator,
  CreditCard,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export function SalarySection() {
  const { teachers } = useTeacherStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("2024-07");

  // Get unique departments
  const departments = Array.from(new Set(teachers.map((t) => t.department)));

  // Calculate salary statistics
  const totalSalaryBudget = teachers.reduce((sum, t) => sum + t.salary, 0);
  const averageSalary =
    teachers.length > 0 ? totalSalaryBudget / teachers.length : 0;
  const highestSalary = Math.max(...teachers.map((t) => t.salary));

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || teacher.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  // Mock salary slip data for demonstration
  const getSalarySlip = (teacher: Teacher) => {
    const basicSalary = teacher.salary;
    const allowances = {
      housing: Math.round(basicSalary * 0.15),
      transport: Math.round(basicSalary * 0.08),
      medical: Math.round(basicSalary * 0.05),
      other: Math.round(basicSalary * 0.02),
    };
    const totalAllowances = Object.values(allowances).reduce(
      (sum, val) => sum + val,
      0
    );
    const grossSalary = basicSalary + totalAllowances;

    const deductions = {
      tax: Math.round(grossSalary * 0.18),
      insurance: Math.round(grossSalary * 0.03),
      providentFund: Math.round(basicSalary * 0.12),
      other: 0,
    };
    const totalDeductions = Object.values(deductions).reduce(
      (sum, val) => sum + val,
      0
    );
    const netSalary = grossSalary - totalDeductions;

    return {
      basicSalary,
      allowances,
      totalAllowances,
      grossSalary,
      deductions,
      totalDeductions,
      netSalary,
    };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
            Salary Management
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage teacher salaries and payroll processing
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export Payroll</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Calculator className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Process Payroll</span>
            <span className="sm:hidden">Process</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSalaryBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly salary budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Salary
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(averageSalary).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Per teacher average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Highest Salary
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${highestSalary.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum compensation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">On payroll</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Salary by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Salary by Department</CardTitle>
            <CardDescription>
              Total salary distribution across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockSalaryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Total Salary",
                  ]}
                />
                <Bar dataKey="totalSalary" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary Range Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Range Distribution</CardTitle>
            <CardDescription>
              Number of teachers in each salary range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "$60K-$70K",
                      value: teachers.filter(
                        (t) => t.salary >= 60000 && t.salary < 70000
                      ).length,
                    },
                    {
                      name: "$70K-$80K",
                      value: teachers.filter(
                        (t) => t.salary >= 70000 && t.salary < 80000
                      ).length,
                    },
                    {
                      name: "$80K+",
                      value: teachers.filter((t) => t.salary >= 80000).length,
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Salary Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <CardTitle>Teacher Salaries</CardTitle>
              <CardDescription>
                Manage individual teacher compensation
              </CardDescription>
            </div>
            <div className="flex items-center">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-07">July 2024</SelectItem>
                  <SelectItem value="2024-06">June 2024</SelectItem>
                  <SelectItem value="2024-05">May 2024</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          {/* Salary List */}
          <div className="space-y-4">
            {filteredTeachers.map((teacher) => {
              const salarySlip = getSalarySlip(teacher);

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
                      <div className="text-center sm:text-right">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Basic Salary
                        </p>
                        <p className="font-semibold text-sm sm:text-base">
                          ${teacher.salary.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Gross Salary
                        </p>
                        <p className="font-semibold text-green-600 text-sm sm:text-base">
                          ${salarySlip.grossSalary.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Net Salary
                        </p>
                        <p className="font-semibold text-blue-600 text-sm sm:text-base">
                          ${salarySlip.netSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No salary records found
              </h3>
              <p className="text-gray-500">
                No teachers match your current search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payroll Summary - {selectedMonth}</CardTitle>
            <CardDescription>Monthly payroll breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Total Basic Salaries
              </span>
              <span className="font-semibold">
                ${totalSalaryBudget.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Allowances</span>
              <span className="font-semibold">
                ${Math.round(totalSalaryBudget * 0.3).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Deductions</span>
              <span className="font-semibold text-red-600">
                -${Math.round(totalSalaryBudget * 0.33).toLocaleString()}
              </span>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span className="font-medium">Net Payroll</span>
              <span className="font-bold text-lg text-green-600">
                $
                {Math.round(
                  totalSalaryBudget * 1.3 - totalSalaryBudget * 0.33
                ).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest salary payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teachers.slice(0, 5).map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {teacher.firstName} {teacher.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Salary payment processed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    ${getSalarySlip(teacher).netSalary.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">July 1, 2024</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
