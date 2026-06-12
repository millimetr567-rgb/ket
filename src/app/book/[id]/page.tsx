import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
  });

  if (!book) {
    return notFound();
  }

  return (
    <div className="book-page">
      <header className="glass page-header">
        <Link href="/catalog" className="back-link">
          &larr; Katalogga qaytish
        </Link>
        <h2>{book.title}</h2>
      </header>

      <main className="book-content">
        <aside className="book-sidebar glass">
          <div className="cover-placeholder">PDF</div>
          <div className="book-meta">
            <h3>Ma'lumotlar</h3>
            <p><strong>Muallif:</strong> {book.author}</p>
            <p><strong>Nashriyot:</strong> {book.publisher || "Noma'lum"}</p>
            <p><strong>Yil:</strong> {book.publishYear || "Noma'lum"}</p>
            <p><strong>ISBN:</strong> {book.isbn || "-"}</p>
            <p><strong>Janr:</strong> {book.genre || "-"}</p>
          </div>
          
          <div className="book-annotation">
            <h3>Annotatsiya</h3>
            <p>{book.annotation || "Annotatsiya mavjud emas."}</p>
          </div>

          {book.qrCodeUrl && (
            <div className="qr-box">
              <p>Telefon orqali o'qish:</p>
              <img src={book.qrCodeUrl} alt="QR Code" />
            </div>
          )}
        </aside>

        <section className="pdf-viewer glass">
          {book.pdfUrl ? (
            <iframe
              src={`${book.pdfUrl}#toolbar=0`}
              title={book.title}
              className="pdf-frame"
            />
          ) : (
            <div className="no-pdf">
              <p>PDF fayl topilmadi.</p>
            </div>
          )}
        </section>
      </main>

      <style>{`
        .book-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg-color);
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-md) var(--space-xl);
          border-radius: 0;
          border-bottom: 1px solid var(--border);
        }

        .back-link {
          color: var(--secondary);
          font-weight: 500;
          text-decoration: none;
        }

        .back-link:hover {
          color: var(--primary);
        }

        .page-header h2 {
          margin: 0;
          color: var(--text-color);
        }

        .book-content {
          display: flex;
          flex: 1;
          gap: var(--space-lg);
          padding: var(--space-lg);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .book-sidebar {
          width: 300px;
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          overflow-y: auto;
        }

        .cover-placeholder {
          height: 400px;
          background: var(--surface-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: var(--secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }

        .book-meta h3, .book-annotation h3 {
          margin-bottom: var(--space-sm);
          color: var(--primary);
          border-bottom: 1px solid var(--border);
          padding-bottom: var(--space-xs);
        }

        .book-meta p {
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .book-annotation p {
          font-size: 0.9rem;
          color: var(--secondary);
          line-height: 1.6;
        }

        .qr-box {
          text-align: center;
          margin-top: auto;
          padding-top: var(--space-md);
          border-top: 1px dashed var(--border);
        }

        .qr-box img {
          width: 120px;
          height: 120px;
          margin-top: var(--space-sm);
          border-radius: var(--radius-sm);
        }

        .pdf-viewer {
          flex: 1;
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .pdf-frame {
          width: 100%;
          height: 100%;
          border: none;
        }

        .no-pdf {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--secondary);
        }

        @media (max-width: 900px) {
          .book-content {
            flex-direction: column;
          }
          .book-sidebar {
            width: 100%;
            height: auto;
          }
          .pdf-viewer {
            height: 600px;
          }
        }
      `}</style>
    </div>
  );
}
