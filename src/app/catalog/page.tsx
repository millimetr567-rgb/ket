import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { search?: string; genre?: string };
}) {
  const search = searchParams?.search || "";
  const genre = searchParams?.genre || "";

  // Fetch books based on search parameters
  const books = await prisma.book.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { author: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        genre ? { genre: { contains: genre, mode: "insensitive" } } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="catalog-container">
      <header className="catalog-header glass">
        <div className="header-content">
          <h1>Elektron Katalog</h1>
          <nav>
            <Link href="/" className="nav-link">Bosh sahifa</Link>
          </nav>
        </div>
      </header>

      <main className="catalog-main">
        <aside className="filters glass">
          <h3>Filtrlash</h3>
          <form className="filter-form">
            <div className="form-group">
              <label>Qidiruv</label>
              <input
                type="text"
                name="search"
                placeholder="Kitob yoki muallif..."
                defaultValue={search}
              />
            </div>
            <div className="form-group">
              <label>Janr</label>
              <select name="genre" defaultValue={genre}>
                <option value="">Barchasi</option>
                <option value="Badiiy">Badiiy</option>
                <option value="Ilmiy">Ilmiy</option>
                <option value="Tarixiy">Tarixiy</option>
                <option value="Darslik">Darslik</option>
              </select>
            </div>
            <button type="submit" className="btn" style={{ width: "100%", marginTop: "var(--space-sm)" }}>
              Izlash
            </button>
          </form>
        </aside>

        <section className="books-grid">
          {books.length === 0 ? (
            <div className="empty-state">Kitoblar topilmadi.</div>
          ) : (
            books.map((book) => (
              <div key={book.id} className="book-card glass">
                <div className="book-cover">
                  {/* Mock Cover */}
                  <div className="placeholder-cover">PDF</div>
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-genre">{book.genre || "Janr ko'rsatilmagan"}</p>
                  <Link href={`/book/${book.id}`} className="btn">
                    O'qish
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <style>{`
        .catalog-container {
          min-height: 100vh;
          background: var(--bg-color);
          display: flex;
          flex-direction: column;
        }

        .catalog-header {
          padding: var(--space-md) var(--space-xl);
          position: sticky;
          top: 0;
          z-index: 10;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .header-content h1 {
          color: var(--primary);
          margin: 0;
          font-size: 1.5rem;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-color);
        }

        .catalog-main {
          display: flex;
          gap: var(--space-lg);
          padding: var(--space-xl);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          flex: 1;
        }

        .filters {
          width: 250px;
          padding: var(--space-lg);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .filters h3 {
          margin-bottom: var(--space-md);
          color: var(--primary);
        }

        .filter-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .form-group label {
          font-size: 0.85rem;
          color: var(--secondary);
        }

        .form-group input, .form-group select {
          padding: var(--space-sm);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-color);
        }

        .books-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--space-lg);
          align-content: start;
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: var(--space-xl);
          color: var(--secondary);
          font-size: 1.1rem;
        }

        .book-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform var(--transition-fast);
        }

        .book-card:hover {
          transform: translateY(-4px);
        }

        .book-cover {
          height: 250px;
          background: var(--surface-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border);
        }

        .placeholder-cover {
          font-size: 2rem;
          font-weight: bold;
          color: var(--secondary);
          opacity: 0.3;
        }

        .book-info {
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          flex: 1;
        }

        .book-title {
          font-size: 1rem;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .book-author {
          font-size: 0.85rem;
          color: var(--secondary);
          margin: 0;
        }

        .book-genre {
          font-size: 0.75rem;
          color: var(--primary);
          background: rgba(37, 99, 235, 0.1);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          width: fit-content;
          margin-bottom: var(--space-sm);
        }

        @media (max-width: 768px) {
          .catalog-main {
            flex-direction: column;
          }
          .filters {
            width: 100%;
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
