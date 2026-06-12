export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-lg)' }}>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card glass">
          <h3>Jami kitoblar</h3>
          <p className="stat-number">1,245</p>
        </div>
        <div className="stat-card glass">
          <h3>Foydalanuvchilar</h3>
          <p className="stat-number">8,432</p>
        </div>
        <div className="stat-card glass">
          <h3>O'qishlar soni</h3>
          <p className="stat-number">45,912</p>
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
        }

        .stat-card {
          padding: var(--space-xl);
          text-align: center;
        }

        .stat-card h3 {
          color: var(--secondary);
          font-size: 1rem;
          margin-bottom: var(--space-sm);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
