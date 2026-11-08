'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken, logout } from '@/lib/api';
import { StethoscopeIcon, ChartBarIcon, PresentationChartIcon, LogoutIcon } from '@/components/Icons';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { setLoggedIn(!!getAccessToken()); }, []);

  function handleLogout() {
    logout();
    setLoggedIn(false);
    router.push('/login');
  }

  if (pathname?.startsWith('/consultations') || pathname?.startsWith('/presentation')) return null;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <StethoscopeIcon size={22} />
          MedAdvise AI
        </Link>
        <div className="navbar-links">
          <Link href="/metrics" className={pathname === '/metrics' ? 'active' : ''} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ChartBarIcon size={16} />
            Metrics
          </Link>
          <Link href="/presentation" className={pathname === '/presentation' ? 'active' : ''} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <PresentationChartIcon size={16} />
            Presentation
          </Link>
          {loggedIn ? (
            <>
              <Link href="/consultations" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                Consultations
              </Link>
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <LogoutIcon size={15} />
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={pathname === '/login' ? 'active' : ''}>Log in</Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
