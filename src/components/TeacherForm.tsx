"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { teacherFormSchema, TeacherFormData } from "@/lib/validations/teacher";
import { Teacher } from "@/types/teacher";

interface TeacherFormProps {
  onSubmit: (data: Omit<Teacher, "id" | "status">) => void;
  departments: string[];
  subjects: string[];
}

const commonDepartments = [
  "Science",
  "Mathematics",
  "Arts",
  "Languages",
  "Social Studies",
  "Physical Education",
  "Technology",
  "Music",
];

const commonSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
  "Physical Education",
  "Music",
  "Art",
];

export function TeacherForm({ onSubmit, departments, subjects }: TeacherFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phone: "",
      experience: 0,
      qualification: "",
      department: "",
      joinDate: new Date().toISOString().split('T')[0],
    },
  });

  const selectedDepartment = watch("department");
  const selectedSubject = watch("subject");

  const handleFormSubmit = async (data: TeacherFormData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      onSubmit({
        ...data,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
      });
      
      reset();
      toast.success("Teacher added successfully!");
    } catch (error) {
      toast.error("Failed to add teacher. Please try again.");
      console.error("Error adding teacher:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const allDepartments = Array.from(new Set([...commonDepartments, ...departments])).sort();
  const allSubjects = Array.from(new Set([...commonSubjects, ...subjects])).sort();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Teacher
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  {...register("phone")}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  {...register("joinDate")}
                  className={errors.joinDate ? "border-destructive" : ""}
                />
                {errors.joinDate && (
                  <p className="text-sm text-destructive">{errors.joinDate.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={selectedDepartment}
                  onValueChange={(value) => setValue("department", value)}
                >
                  <SelectTrigger className={errors.department ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {allDepartments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-destructive">{errors.department.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  value={selectedSubject}
                  onValueChange={(value) => setValue("subject", value)}
                >
                  <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {allSubjects.map((subj) => (
                      <SelectItem key={subj} value={subj}>
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  placeholder="e.g., PhD in Mathematics"
                  {...register("qualification")}
                  className={errors.qualification ? "border-destructive" : ""}
                />
                {errors.qualification && (
                  <p className="text-sm text-destructive">{errors.qualification.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="Enter years of experience"
                  {...register("experience", { valueAsNumber: true })}
                  className={errors.experience ? "border-destructive" : ""}
                />
                {errors.experience && (
                  <p className="text-sm text-destructive">{errors.experience.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Teacher
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}