import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function getHealth(): Promise<{ status: string } | null> {
  try {
    const res = await fetch(`${API_URL}/api/health/`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const health = await getHealth();

  return (
    <main className="page">
      <section className="hero">
        <h1>MedAdvise AI</h1>
        <p className="subtitle">
          Describe your symptoms and get a quick preliminary response — built as a thesis
          project scaffold.
        </p>
        <p>
          <StatusBadge
            status={health ? health.status : 'backend unreachable'}
          />
        </p>
        <div className="hero-actions">
          <Link href="/register" className="btn btn-primary">
            Get started
          </Link>
          <Link href="/login" className="btn btn-secondary">
            Log in
          </Link>
        </div>
      </section>
    </main>
  );
}
