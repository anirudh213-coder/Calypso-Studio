import type { ReactNode } from 'react';

export default function WorkingArea({ children }: { children: ReactNode }) {
  return <main className="relative z-0 min-h-screen">{children}</main>;
}
