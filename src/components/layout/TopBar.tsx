'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Globe
} from 'lucide-react';

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const [notifications] = React.useState(3);
  const [currentSchool] = React.useState('Springfield High School');
  const [currentUser] = React.useState({
    name: 'Admin User',
    email: 'admin@school.edu',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin%20User',
    role: 'Administrator'
  });

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-gray-200 bg-white px-3 sm:px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="lg:hidden p-1 sm:p-2"
        >
          <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* School Selector */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg">
          <Globe className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{currentSchool}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 flex-1 max-w-[400px]">
          <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search teachers, attendance, reports..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
        {/* Mobile Search Button */}
        <Button variant="ghost" size="sm" className="md:hidden p-1 sm:p-2">
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative p-1 sm:p-2">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-0.5 -right-0.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {notifications}
              </Badge>
            )}
          </Button>
        </div>

        {/* Settings */}
        <Button variant="ghost" size="sm" className="hidden sm:flex p-1 sm:p-2">
          <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* User Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-3 border-l border-gray-200">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{currentUser.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-[120px]">{currentUser.role}</p>
          </div>
          
          <div className="relative group">
            <button className="flex items-center space-x-1 sm:space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs sm:text-sm font-medium">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
              </div>
              
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
              
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}