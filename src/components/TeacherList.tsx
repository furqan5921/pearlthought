"use client";

import { useState } from "react";
import { Search, Filter, Users, Grid, List } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { TeacherCard } from "./TeacherCard";
import { Teacher, TeacherFilters } from "@/types/teacher";

interface TeacherListProps {
  teachers: Teacher[];
  filters: TeacherFilters;
  onFiltersChange: (filters: TeacherFilters) => void;
  departments: string[];
  subjects: string[];
  onEditTeacher?: (teacher: Teacher) => void;
  onDeleteTeacher?: (id: string) => void;
  loading?: boolean;
}

export function TeacherList({
  teachers,
  filters,
  onFiltersChange,
  departments,
  subjects,
  onEditTeacher,
  onDeleteTeacher,
  loading = false,
}: TeacherListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleDepartmentChange = (value: string) => {
    onFiltersChange({ ...filters, department: value === "all" ? "" : value });
  };

  const handleSubjectChange = (value: string) => {
    onFiltersChange({ ...filters, subject: value === "all" ? "" : value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value as TeacherFilters["status"] });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      department: "",
      subject: "",
      status: "all",
    });
  };

  const hasActiveFilters = filters.search || filters.department || filters.subject || filters.status !== "all";

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Loading teachers...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select
                value={filters.department || "all"}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select
                value={filters.subject || "all"}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary">
                  Search: {filters.search}
                </Badge>
              )}
              {filters.department && (
                <Badge variant="secondary">
                  Department: {filters.department}
                </Badge>
              )}
              {filters.subject && (
                <Badge variant="secondary">
                  Subject: {filters.subject}
                </Badge>
              )}
              {filters.status !== "all" && (
                <Badge variant="secondary">
                  Status: {filters.status}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Teachers ({teachers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {teachers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No teachers found
              </h3>
              <p className="text-muted-foreground mb-4">
                {hasActiveFilters
                  ? "Try adjusting your filters to see more results."
                  : "Start by adding your first teacher."}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onEdit={onEditTeacher}
                  onDelete={onDeleteTeacher}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}