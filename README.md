# 🎓 Teacher Management System

A modern, responsive, and intuitive teacher management dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing teaching staff with a focus on user experience, accessibility, and modern design principles.

![Teacher Management System](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **Dashboard**: Comprehensive overview with statistics and quick access to all sections
- **Teacher Management**: Complete CRUD operations for teacher data
  - Add new teachers with comprehensive form validation
  - View teachers in beautiful card-based layout
  - Search and filter by department, subject, and status
- **Attendance Tracking**: Monitor teacher attendance and leave requests
- **Salary Management**: Handle salary information and payroll data
- **Progress Analytics**: Track performance metrics and analytics
- **Settings**: Application configuration and preferences
- **Responsive Design**: Mobile-first approach ensuring perfect experience across all devices

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface following current design trends
- **Navigation**: Intuitive sidebar navigation with section-based routing
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Smooth Animations**: Subtle transitions and micro-interactions
- **Accessibility**: WCAG-compliant with proper focus indicators and ARIA attributes
- **Loading States**: Elegant loading animations and skeleton screens
- **Toast Notifications**: Real-time feedback for user actions using Sonner
- **Modal Dialogs**: Seamless form interactions with Radix UI dialogs

### 🔧 Technical Features
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Form Validation**: Robust validation using Zod and React Hook Form
- **State Management**: Zustand for efficient global state management
- **Local Storage**: Persistent data storage with sample data initialization
- **Component Architecture**: Modular, reusable components following React best practices
- **Performance Optimized**: Efficient rendering and state management
- **Modern React**: React 19 with latest features and hooks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/furqan5921/pearlthought.git
   cd pearlthought
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
pearlthought/
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles and Tailwind imports
│   │   ├── layout.tsx          # Root layout with Toaster integration
│   │   ├── page.tsx            # Dashboard home page
│   │   ├── favicon.ico         # Application favicon
│   │   ├── analytics/          # Analytics section
│   │   │   └── page.tsx
│   │   ├── attendance/         # Attendance management
│   │   │   └── page.tsx
│   │   ├── progress/           # Progress tracking
│   │   │   └── page.tsx
│   │   ├── salary/             # Salary management
│   │   │   └── page.tsx
│   │   ├── settings/           # Application settings
│   │   │   └── page.tsx
│   │   └── teachers/           # Teacher management
│   │       └── page.tsx
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components (shadcn/ui)
│   │   │   ├── avatar.tsx      # User avatar component
│   │   │   ├── badge.tsx       # Status badges
│   │   │   ├── button.tsx      # Button variants
│   │   │   ├── card.tsx        # Card containers
│   │   │   ├── dialog.tsx      # Modal dialogs
│   │   │   ├── input.tsx       # Form inputs
│   │   │   ├── label.tsx       # Form labels
│   │   │   ├── select.tsx      # Dropdown selects
│   │   │   ├── separator.tsx   # Visual separators
│   │   │   ├── switch.tsx      # Toggle switches
│   │   │   ├── tabs.tsx        # Tab navigation
│   │   │   └── textarea.tsx    # Text areas
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   └── DashboardHome.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── MainLayout.tsx  # Main application layout
│   │   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   │   └── TopBar.tsx      # Top navigation bar
│   │   ├── sections/           # Section-specific components
│   │   │   ├── AnalyticsSection.tsx
│   │   │   ├── AttendanceSection.tsx
│   │   │   ├── ProgressSection.tsx
│   │   │   ├── SalarySection.tsx
│   │   │   ├── SettingsSection.tsx
│   │   │   └── TeachersSection.tsx  # Teacher management with form integration
│   │   ├── Header.tsx          # Statistics header component
│   │   ├── TeacherCard.tsx     # Individual teacher card
│   │   ├── TeacherForm.tsx     # Add/edit teacher form with validation
│   │   └── TeacherList.tsx     # Teachers list with filters
│   ├── hooks/                  # Custom React hooks
│   │   └── useTeachers.ts      # Teacher management hook
│   ├── lib/                    # Utility functions and configurations
│   │   ├── mock-data.ts        # Sample data for development
│   │   ├── storage.ts          # Local storage management
│   │   ├── store.ts            # Zustand store configuration
│   │   ├── types.ts            # Shared type definitions
│   │   ├── utils.ts            # General utilities and cn helper
│   │   └── validations/        # Form validation schemas
│   │       └── teacher.ts      # Teacher form validation with Zod
│   ├── types/                  # TypeScript type definitions
│   │   └── teacher.ts          # Teacher-related types
│   └── assets/                 # Additional assets (if any)
├── .gitignore                  # Git ignore rules
├── components.json             # shadcn/ui configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # Project documentation
└── tsconfig.json              # TypeScript configuration
```

## 📦 Dependencies

### Core Dependencies
- **Next.js 15.3.5**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Static type checking
- **Tailwind CSS 4**: Utility-first CSS framework

### UI & Components
- **Radix UI**: Accessible component primitives
  - `@radix-ui/react-avatar`: Avatar components
  - `@radix-ui/react-dialog`: Modal dialogs
  - `@radix-ui/react-label`: Form labels
  - `@radix-ui/react-select`: Dropdown selects
  - `@radix-ui/react-tabs`: Tab navigation
  - `@radix-ui/react-toast`: Toast notifications
- **Lucide React**: Beautiful icon library
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional CSS classes

### Form & Validation
- **React Hook Form**: Efficient form state management
- **Zod 4**: TypeScript-first schema validation
- **@hookform/resolvers**: Form validation resolvers

### State & Data
- **Zustand 5**: Lightweight state management
- **date-fns**: Date manipulation utilities

### Notifications & UI Feedback
- **Sonner**: Toast notification system

### Charts & Analytics
- **Recharts**: React charting library

## 🎨 Design System

### Color Palette
- **Primary**: Modern blue tones for primary actions
- **Success**: Green for positive states (active teachers)
- **Warning**: Yellow for attention states
- **Destructive**: Red for dangerous actions (delete)
- **Muted**: Gray tones for secondary information

### Typography
- **Font**: Inter (Google Fonts) for excellent readability
- **Hierarchy**: Clear heading structure (h1-h3)
- **Responsive**: Scales appropriately across devices

### Components
- **Cards**: Elevated surfaces with subtle shadows
- **Buttons**: Multiple variants (default, outline, ghost, destructive)
- **Forms**: Consistent styling with proper validation states
- **Badges**: Status indicators with semantic colors
- **Dialogs**: Modal overlays for forms and confirmations

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile (320px+)**: Single column layout, collapsible sidebar
- **Tablet (768px+)**: Two-column grid, expanded forms
- **Desktop (1024px+)**: Full sidebar, three-column grid
- **Large (1280px+)**: Optimized spacing and typography

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Responsive Text**: Scalable fonts that work with browser zoom

## 🔧 Technical Implementation

### State Management
- **Zustand Store**: Global state for teachers, settings, and UI state
- **React Hooks**: useState, useEffect, useCallback for local state
- **Custom Hooks**: useTeachers for centralized teacher management
- **Local Storage**: Persistent data with automatic initialization

### Form Handling
- **React Hook Form**: Efficient form state management
- **Zod Validation**: Type-safe schema validation
- **Error Handling**: Comprehensive error states and messages
- **Toast Notifications**: Real-time feedback using Sonner

### Routing & Navigation
- **Next.js App Router**: File-based routing with layouts
- **Dynamic Routes**: Section-based navigation
- **Sidebar Navigation**: Persistent navigation across routes

### Data Flow
1. **Storage Layer**: Local storage with CRUD operations
2. **Store Layer**: Zustand provides global state management
3. **Hook Layer**: useTeachers provides data and actions
4. **Component Layer**: UI components consume hook data
5. **User Interaction**: Forms and buttons trigger store actions

## 🎯 Key Features Explained

### Dashboard
- **Statistics Overview**: Real-time metrics and KPIs
- **Quick Actions**: Direct access to common tasks
- **Recent Activity**: Latest updates and changes

### Teacher Management
- **Add Teacher**: Comprehensive form with validation
  - Personal information (name, email, phone, join date)
  - Professional information (department, subject, qualification, experience)
  - Form validation with Zod schemas
  - Toast notifications for success/error feedback
- **View Teachers**: Card-based layout with detailed information
- **Search & Filter**: Advanced filtering capabilities
- **Status Management**: Active/inactive teacher states

### Section-Based Architecture
- **Analytics**: Performance metrics and reporting
- **Attendance**: Attendance tracking and leave management
- **Progress**: Progress monitoring and goal tracking
- **Salary**: Payroll and compensation management
- **Settings**: Application configuration and preferences

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔮 Future Enhancements

### Planned Features
- [ ] **Edit Teacher**: In-place editing functionality
- [ ] **Bulk Operations**: Select and manage multiple teachers
- [ ] **Export Data**: CSV/PDF export functionality
- [ ] **Advanced Analytics**: Charts and reporting with Recharts
- [ ] **User Authentication**: Login and role-based access
- [ ] **API Integration**: Backend API connectivity
- [ ] **File Upload**: Teacher photo upload
- [ ] **Email Integration**: Send notifications to teachers
- [ ] **Calendar Integration**: Schedule management
- [ ] **Mobile App**: React Native companion app

### Technical Improvements
- [ ] **Unit Tests**: Jest and React Testing Library
- [ ] **E2E Tests**: Playwright or Cypress
- [ ] **Performance**: React.memo and useMemo optimizations
- [ ] **PWA**: Progressive Web App features
- [ ] **Internationalization**: Multi-language support
- [ ] **Database Integration**: PostgreSQL or MongoDB
- [ ] **Real-time Updates**: WebSocket integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add proper type definitions
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **Lucide React** for beautiful icons
- **Vercel** for seamless deployment
- **Zustand** for lightweight state management
- **React Hook Form** for efficient form handling
- **Zod** for runtime type validation

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and modern React patterns**

For questions or support, please open an issue on GitHub.
