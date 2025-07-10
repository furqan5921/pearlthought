'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Building,
  Globe,
  User,
  Bell,
  Shield,
  Database,
  HardDrive,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Key,
  Users,
  Camera,
  Upload,
  Trash2
} from 'lucide-react';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    attendance: true,
    salary: true,
    performance: false
  });

  const [generalSettings, setGeneralSettings] = useState({
    schoolName: 'Greenwood High School',
    address: '123 Education Street, Learning City, LC 12345',
    phone: '+1 (555) 123-4567',
    email: 'admin@greenwood.edu',
    website: 'www.greenwood.edu',
    timezone: 'America/New_York',
    language: 'en',
    currency: 'USD'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5'
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: '7',
    maintenanceMode: false,
    debugMode: false
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Settings</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your system preferences and configurations</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Reset to Defaults</span>
            <span className="sm:hidden">Reset</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Save Changes</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto">
          <TabsTrigger value="general" className="text-xs sm:text-sm py-2">General</TabsTrigger>
          <TabsTrigger value="profile" className="text-xs sm:text-sm py-2">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm py-2">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm py-2 hidden sm:block">Security</TabsTrigger>
          <TabsTrigger value="system" className="text-xs sm:text-sm py-2 hidden sm:block">System</TabsTrigger>
          <TabsTrigger value="backup" className="text-xs sm:text-sm py-2 hidden sm:block">Backup</TabsTrigger>
        </TabsList>

        {/* Mobile-only additional tabs */}
        <div className="sm:hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="security" className="text-xs py-2">Security</TabsTrigger>
            <TabsTrigger value="system" className="text-xs py-2">System</TabsTrigger>
            <TabsTrigger value="backup" className="text-xs py-2">Backup</TabsTrigger>
          </TabsList>
        </div>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  School Information
                </CardTitle>
                <CardDescription>Basic information about your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={generalSettings.schoolName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings(prev => ({ ...prev, schoolName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={generalSettings.address}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setGeneralSettings(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={generalSettings.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={generalSettings.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={generalSettings.website}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneralSettings(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Timezone, language, and currency preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={generalSettings.currency} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Administrator Profile
              </CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="relative flex-shrink-0 self-center sm:self-auto">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-base sm:text-lg">AD</AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-lg font-semibold">Profile Picture</h3>
                  <p className="text-sm text-gray-500">Upload a new profile picture</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Administrator" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" defaultValue="System Administrator" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input id="profileEmail" type="email" defaultValue="admin@greenwood.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profilePhone">Phone</Label>
                    <Input id="profilePhone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" rows={3} placeholder="Brief description about yourself..." />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Key className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="min-w-0 flex-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="min-w-0 flex-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="min-w-0 flex-1">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Text message notifications</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <Label className="min-w-0 flex-1">Attendance Alerts</Label>
                    <Switch
                      checked={notifications.attendance}
                      onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, attendance: checked }))}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <Label className="min-w-0 flex-1">Salary Updates</Label>
                    <Switch
                      checked={notifications.salary}
                      onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, salary: checked }))}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <Label className="min-w-0 flex-1">Performance Reviews</Label>
                    <Switch
                      checked={notifications.performance}
                      onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, performance: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage authentication and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="min-w-0 flex-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked: boolean) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                    />
                    <Badge variant={securitySettings.twoFactorAuth ? "default" : "secondary"}>
                      {securitySettings.twoFactorAuth ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Select value={securitySettings.passwordExpiry} onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Super Admin</p>
                      <p className="text-sm text-gray-500">Full system access</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">HR Manager</p>
                      <p className="text-sm text-gray-500">Teacher management only</p>
                    </div>
                    <Badge variant="secondary">Inactive</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Roles & Permissions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  System Configuration
                </CardTitle>
                <CardDescription>Core system settings and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="min-w-0 flex-1">
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-gray-500">Automatically backup data</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked: boolean) => setSystemSettings(prev => ({ ...prev, autoBackup: checked }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select value={systemSettings.backupFrequency} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, backupFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="min-w-0 flex-1">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">Temporarily disable access</p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked: boolean) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="min-w-0 flex-1">
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-gray-500">Enable detailed logging</p>
                    </div>
                    <Switch
                      checked={systemSettings.debugMode}
                      onCheckedChange={(checked: boolean) => setSystemSettings(prev => ({ ...prev, debugMode: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Current system status and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Version</p>
                    <p className="font-medium">v2.1.0</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Updated</p>
                    <p className="font-medium">Dec 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Database Size</p>
                    <p className="font-medium">2.4 GB</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Active Users</p>
                    <p className="font-medium">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HardDrive className="w-5 h-5 mr-2" />
                  Backup Management
                </CardTitle>
                <CardDescription>Manage data backups and restore points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Daily Backup</p>
                      <p className="text-sm text-gray-500">Last: Today 2:00 AM</p>
                    </div>
                    <Badge>Success</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Weekly Backup</p>
                      <p className="text-sm text-gray-500">Last: Sunday 1:00 AM</p>
                    </div>
                    <Badge>Success</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Backup</p>
                      <p className="text-sm text-gray-500">Last: Dec 1, 2024</p>
                    </div>
                    <Badge>Success</Badge>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">Create Backup Now</Button>
                  <Button variant="outline" className="flex-1">Restore Data</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Information</CardTitle>
                <CardDescription>Current storage usage and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used Storage</span>
                    <span>2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Database</p>
                    <p className="font-medium">1.8 GB</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Files</p>
                    <p className="font-medium">0.6 GB</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Backups</p>
                    <p className="font-medium">3.2 GB</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Available</p>
                    <p className="font-medium">7.6 GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}