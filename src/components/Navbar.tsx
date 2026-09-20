'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken, logout } from '@/lib/api';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getAccessToken());
  }, []);

  function handleLogout() {
    logout();
    setLoggedIn(false);
    router.push('/login');
  }

  if (pathname?.startsWith('/consultations')) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          MedAdvise AI
        </Link>
        <div className="navbar-links">
          {loggedIn ? (
            <>
              <Link href="/consultations">Consultations</Link>
              <button onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
