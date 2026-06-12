import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <header className="header glass">
        <div className="logo">
          <h1>KET</h1>
          <p>Kutubxona Elektron Tizimi</p>
        </div>
        <nav>
          <Link href="/login" className="btn">
            Tizimga kirish
          </Link>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-content">
          <h2 className="title">Kitoblar olamiga xush kelibsiz</h2>
          <p className="description">
            Respublika bo'ylab minglab elektron kitoblar, jurnallar va
            qo'llanmalarni o'qing, yuklab oling va izlang. Yagona tizim orqali
            barchasi sizning qo'lingizda.
          </p>
          <div className="actions">
            <Link href="/catalog" className="btn btn-large">
              Katalogni ko'rish
            </Link>
          </div>
        </div>

        <div className="features">
          <div className="feature-card glass">
            <h3>Keng qamrovli baza</h3>
            <p>Barcha viloyat va tuman kutubxonalari bitta platformada jamlangan.</p>
          </div>
          <div className="feature-card glass">
            <h3>Qulay elektron o'quvchi</h3>
            <p>Kitoblarni to'g'ridan-to'g'ri brauzeringizda, qo'shimcha dasturlarsiz o'qing.</p>
          </div>
          <div className="feature-card glass">
            <h3>Sun'iy intellekt yordamchisi</h3>
            <p>Kitob qidirishda va o'qishda sizga yordam beruvchi aqlli tizim.</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Kutubxona Elektron Tizimi. Barcha huquqlar himoyalangan.</p>
      </footer>

      <style>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: radial-gradient(circle at top left, var(--bg-color) 0%, rgba(37, 99, 235, 0.05) 100%);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) var(--space-xl);
          margin: var(--space-md);
          border-radius: var(--radius-full);
          position: sticky;
          top: var(--space-md);
          z-index: 10;
        }

        .logo h1 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--primary);
        }

        .logo p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--secondary);
          font-weight: 500;
        }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-xl) var(--space-md);
          text-align: center;
          animation: fadeIn 0.8s ease-out;
        }

        .hero-content {
          max-width: 800px;
          margin-bottom: var(--space-xl);
        }

        .title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--space-md);
          background: linear-gradient(to right, var(--primary), #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .description {
          font-size: 1.25rem;
          color: var(--secondary);
          margin-bottom: var(--space-lg);
        }

        .btn-large {
          font-size: 1.125rem;
          padding: var(--space-md) var(--space-xl);
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-md);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-lg);
          max-width: 1200px;
          width: 100%;
          margin-top: var(--space-xl);
        }

        .feature-card {
          padding: var(--space-lg);
          text-align: left;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .feature-card h3 {
          color: var(--text-color);
          margin-bottom: var(--space-sm);
        }

        .feature-card p {
          color: var(--secondary);
          font-size: 0.95rem;
        }

        .footer {
          text-align: center;
          padding: var(--space-lg);
          color: var(--secondary);
          font-size: 0.875rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .title { font-size: 2.5rem; }
          .header { padding: var(--space-sm) var(--space-md); margin: var(--space-sm); }
        }
      `}</style>
    </div>
  );
}
