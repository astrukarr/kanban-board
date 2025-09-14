# Kanban Board Application

A modern, responsive Kanban board application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features drag-and-drop functionality, PWA support, and comprehensive testing.

## Features

### Core Functionality

- **Drag & Drop Tasks** - Intuitive task management with `@dnd-kit`
- **Real-time Updates** - Optimistic updates with fallback to API
- **Offline Support** - PWA with service worker and localStorage caching
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Task Management** - Create, move, and organize tasks across columns

### User Experience

- **Modern UI** - Clean, professional design with Tailwind CSS
- **Loading States** - Skeleton components and smooth transitions
- **Toast Notifications** - User feedback for actions
- **Dark/Light Mode Ready** - Prepared for theme switching
- **Accessibility** - ARIA labels and keyboard navigation support

### Technical Features

- **TypeScript** - Full type safety with strict configuration
- **Performance Optimized** - Dynamic imports, memoization, and code splitting
- **Bundle Analysis** - Built-in bundle size monitoring
- **Error Handling** - Centralized error management with retry logic
- **Testing** - Comprehensive test suite with Jest and React Testing Library

## Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Authentication page
│   ├── project/[slug]/   # Dynamic project pages
│   └── settings/         # Settings page
├── components/            # React components
│   ├── buttons/          # Reusable button components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components
│   ├── modals/           # Modal components
│   ├── taskBoardSection/ # Kanban board components
│   ├── TaskCard/         # Task card components
│   └── ui/               # Generic UI components
├── hooks/                 # Custom React hooks
├── lib/                  # API and data layer
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Application constants
```

### Key Components

#### Core Hooks

- **`useTasks`** - Task state management with reducer pattern
- **`useDragAndDrop`** - Drag and drop functionality
- **`useTaskModal`** - Modal state management
- **`useOnlineStatus`** - Network status monitoring

#### Component Architecture

- **Modular Design** - Small, focused components
- **Custom Hooks** - Reusable business logic
- **Type Safety** - Full TypeScript coverage
- **Performance** - Memoization and lazy loading

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/astrukarr/kanban-board.git
   cd kanban-board
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_MAX_RETRIES=3
```

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing

```bash
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Analysis

```bash
npm run analyze      # Analyze bundle size
npm run bundle-analysis # Generate bundle report
```

## Testing

### Test Coverage

- **Current Coverage**: 29.29% statements
- **Target Coverage**: 50%+ statements
- **Test Framework**: Jest + React Testing Library
- **Test Types**: Unit tests, integration tests, hook tests

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure

```
src/
├── __tests__/           # Global tests
├── components/__tests__/ # Component tests
├── hooks/__tests__/     # Hook tests
├── lib/__tests__/       # API tests
└── utils/__tests__/    # Utility tests
```

## Styling & Design

### Tailwind CSS

- **Utility-first** CSS framework
- **Custom configuration** for brand colors
- **Responsive design** with mobile-first approach
- **Dark mode ready** (prepared for implementation)

### Design System

- **Consistent spacing** with Tailwind scale
- **Brand colors** (indigo, emerald, amber)
- **Typography** with proper hierarchy
- **Component variants** for different states

## Configuration

### TypeScript

- **Strict mode** enabled
- **Path mapping** with `@/` alias
- **Type definitions** in `src/types/`
- **No `any` types** in production code

### ESLint & Prettier

- **Next.js ESLint config**
- **Prettier integration**
- **Husky pre-commit hooks**
- **Consistent code formatting**

### Bundle Optimization

- **Dynamic imports** for large components
- **Code splitting** by route
- **Tree shaking** enabled
- **Bundle analysis** with `@next/bundle-analyzer`

## PWA Features

### Service Worker

- **Offline support** with Workbox
- **Caching strategies** for static assets
- **Background sync** for failed requests
- **Update notifications** for new versions

### Manifest

- **App metadata** in `public/manifest.json`
- **Icon sets** for different screen sizes
- **Theme colors** and display modes
- **Installation prompts** on supported browsers

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Bundle Analysis

```bash
npm run analyze
# Opens bundle analyzer in browser
```

### Performance Metrics

- **First Load JS**: 102kB shared
- **Route-specific**: 19.3kB max
- **Bundle size**: Optimized with code splitting
- **Lighthouse score**: 90+ (estimated)

## Code Quality

### Metrics

- **TypeScript**: 100% coverage
- **ESLint**: 0 errors, 6 warnings
- **Prettier**: Consistent formatting
- **Tests**: 177 tests passing
- **Bundle**: 102kB shared JS

### Best Practices

- **Component composition** over inheritance
- **Custom hooks** for business logic
- **Memoization** for performance
- **Error boundaries** for resilience
- **Accessibility** considerations

## Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests for new features
5. **Run** quality checks
6. **Submit** a pull request

### Code Standards

- **TypeScript** for all new code
- **Tests** for new features
- **ESLint** compliance
- **Prettier** formatting
- **Conventional commits**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for styling utilities
- **@dnd-kit** for drag and drop functionality
- **React Testing Library** for testing utilities

---

**Built with modern web technologies**
