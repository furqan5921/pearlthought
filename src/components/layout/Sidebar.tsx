'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  School,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'Teachers',
    href: '/teachers',
    icon: Users,
    badge: '5'
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: Calendar,
    badge: null
  },
  {
    title: 'Salary',
    href: '/salary',
    icon: DollarSign,
    badge: null
  },
  {
    title: 'Progress',
    href: '/progress',
    icon: TrendingUp,
    badge: null
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    badge: null
  }
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">EduManage</h1>
              <p className="text-xs text-gray-500">Teacher Portal</p>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  // Close mobile sidebar on navigation
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={cn(
                    "w-5 h-5",
                    isActive ? "text-blue-600" : "text-gray-500"
                  )} />
                  <span>{item.title}</span>
                </div>
                
                {item.badge && (
                  <Badge 
                    variant={isActive ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">System Status</p>
              <p className="text-xs text-gray-500 truncate">All systems operational</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </aside>
    </>
  );
}