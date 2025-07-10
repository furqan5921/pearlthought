"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, GraduationCap, Building2, MoreVertical, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Teacher } from "@/types/teacher";

interface TeacherCardProps {
  teacher: Teacher;
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (id: string) => void;
}

export function TeacherCard({ teacher, onEdit, onDelete }: TeacherCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onDelete(teacher.id);
      toast.success("Teacher deleted successfully");
    } catch (error) {
      toast.error("Failed to delete teacher");
      console.error("Error deleting teacher:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(teacher.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-foreground leading-none">
                {teacher.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {teacher.subject}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={teacher.status === "active" ? "success" : "secondary"}
              className="capitalize"
            >
              {teacher.status}
            </Badge>
            
            {(onEdit || onDelete) && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{teacher.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{teacher.phone}</span>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{teacher.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{teacher.qualification}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined {formatJoinDate(teacher.joinDate)}</span>
          </div>
        </div>

        {/* Experience Badge */}
        <div className="flex items-center justify-between pt-2">
          <Badge variant="outline" className="text-xs">
            {teacher.experience} {teacher.experience === 1 ? "year" : "years"} experience
          </Badge>
          
          {/* Action Buttons */}
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(teacher)}
                  className="h-8 px-2 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  {isDeleting ? "..." : "Delete"}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}