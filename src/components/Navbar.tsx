'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken, logout } from '@/lib/api';

function MedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  );
}

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
          <MedIcon />
          MedAdvise AI
        </Link>
        <div className="navbar-links">
          <Link href="/metrics" className={pathname === '/metrics' ? 'active' : ''}>Metrics</Link>
          <Link href="/presentation" className={pathname === '/presentation' ? 'active' : ''}>Presentation</Link>
          {loggedIn ? (
            <>
              <Link href="/consultations" className="btn btn-primary" style={{padding:'0.4rem 1rem',fontSize:'0.875rem'}}>Consultations</Link>
              <button onClick={handleLogout} style={{background:'none',border:'1px solid var(--color-border)',borderRadius:'8px',padding:'0.4rem 0.9rem',cursor:'pointer',fontSize:'0.875rem',color:'var(--color-text-muted)'}}>Log out</button>
            </>
          ) : (
            <>
              <Link href="/login" className={pathname === '/login' ? 'active' : ''}>Log in</Link>
              <Link href="/register" className="btn btn-primary" style={{padding:'0.4rem 1rem',fontSize:'0.875rem'}}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
