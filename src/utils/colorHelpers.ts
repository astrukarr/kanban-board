/**
 * Utility functions for color styling based on status and project colors
 */

/**
 * Get status color classes for badges
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-600';
    case 'planning':
      return 'bg-amber-100 text-amber-600';
    case 'completed':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

/**
 * Get project color classes for project icons
 */
export function getProjectColor(color: string): string {
  switch (color) {
    case 'indigo':
      return 'bg-indigo-100';
    case 'emerald':
      return 'bg-emerald-100';
    case 'blue':
      return 'bg-blue-100';
    case 'purple':
      return 'bg-purple-100';
    case 'orange':
      return 'bg-orange-100';
    case 'teal':
      return 'bg-teal-100';
    default:
      return 'bg-slate-100';
  }
}

/**
 * Get stat color classes for dashboard stats
 */
export function getStatColor(color: string): string {
  switch (color) {
    case 'indigo':
      return 'bg-indigo-100';
    case 'emerald':
      return 'bg-emerald-100';
    case 'blue':
      return 'bg-blue-100';
    case 'purple':
      return 'bg-purple-100';
    case 'orange':
      return 'bg-orange-100';
    case 'teal':
      return 'bg-teal-100';
    default:
      return 'bg-slate-100';
  }
}
