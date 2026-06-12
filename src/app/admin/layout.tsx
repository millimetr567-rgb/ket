import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  // In a real app, you'd check session?.user?.role !== 'USER'
  if (!session || !session.user || (session.user as any).role !== "SUPER_ADMIN" && (session.user as any).role !== "TUMAN_ADMIN" && (session.user as any).role !== "VILOYAT_ADMIN") {
    redirect("/login");
  }

  return (
    <div className="admin-container">
      <aside className="sidebar glass">
        <h2>KET Admin</h2>
        <nav>
          <Link href="/admin">Bosh sahifa (Dashboard)</Link>
          <Link href="/admin/upload">Kitob qo'shish</Link>
          <Link href="/admin/approvals">Arizalar (Tasdiqlash)</Link>
          <Link href="/catalog">Katalog</Link>
          <Link href="/">Tizimdan chiqish</Link>
        </nav>
      </aside>
      <main className="admin-content">
        {children}
      </main>

      <style>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: var(--bg-color);
        }
        
        .sidebar {
          width: 280px;
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          border-right: 1px solid var(--border);
          border-radius: 0;
        }

        .sidebar h2 {
          color: var(--primary);
          margin-bottom: var(--space-xl);
        }

        .sidebar nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .sidebar nav a {
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
          color: var(--text-color);
          font-weight: 500;
        }

        .sidebar nav a:hover {
          background: var(--primary);
          color: white;
        }

        .admin-content {
          flex: 1;
          padding: var(--space-xl);
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
