import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Staff } from '@/types';

interface AuthState {
  currentUser: Staff | null;
  isAuthenticated: boolean;
  staff: Staff[];
  login: (pin: string) => boolean;
  logout: () => void;
  addStaff: (staff: Staff) => void;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  removeStaff: (id: string) => void;
}

const INITIAL_STAFF: Staff[] = [
  {
    id: 'vendor-1',
    name: 'Manny',
    pin: '1234',
    role: 'vendor',
    salesCount: 142,
    totalRevenue: 284000,
    createdAt: '2024-01-01T00:00:00Z',
    active: true,
  },
  {
    id: 'staff-2',
    name: 'Adaeze',
    pin: '5678',
    role: 'attendant',
    salesCount: 87,
    totalRevenue: 138000,
    createdAt: '2024-02-15T00:00:00Z',
    active: true,
  },
  {
    id: 'staff-3',
    name: 'Emeka',
    pin: '9012',
    role: 'attendant',
    salesCount: 55,
    totalRevenue: 96000,
    createdAt: '2024-03-01T00:00:00Z',
    active: true,
  },
];

// Helper: set / clear the ss-session cookie so Next.js middleware can detect auth
function setSessionCookie(value: string | null) {
  if (typeof document === 'undefined') return;
  if (value) {
    // 8-hour session
    const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString();
    document.cookie = `ss-session=${value}; path=/; expires=${expires}; SameSite=Strict`;
  } else {
    document.cookie = 'ss-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      staff: INITIAL_STAFF,
      login: (pin: string) => {
        const { staff } = get();
        const match = staff.find((s) => s.pin === pin && s.active);
        if (match) {
          set({ currentUser: match, isAuthenticated: true });
          setSessionCookie(match.id);
          return true;
        }
        return false;
      },
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
        setSessionCookie(null);
      },
      addStaff: (staffMember) =>
        set((state) => ({ staff: [...state.staff, staffMember] })),
      updateStaff: (id, updates) =>
        set((state) => ({
          staff: state.staff.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      removeStaff: (id) =>
        set((state) => ({ staff: state.staff.filter((s) => s.id !== id) })),
    }),
    { name: 'shopsmart-auth' }
  )
);
