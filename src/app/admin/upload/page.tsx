"use client";

import { useState } from "react";

export default function BookUploadPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setQrCode(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSuccess(true);
        if (data.book.qrCodeUrl) {
          setQrCode(data.book.qrCodeUrl);
        }
        (e.target as HTMLFormElement).reset();
      } else {
        alert(data.error || "Xatolik yuz berdi");
      }
    } catch (err) {
      alert("Tarmoq xatosi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1 style={{ marginBottom: 'var(--space-lg)' }}>Yangi kitob qo'shish</h1>
      
      <div className="glass upload-form-card">
        {success && (
          <div className="success-banner">
            <p>Kitob muvaffaqiyatli yuklandi!</p>
            {qrCode && (
              <div className="qr-container">
                <p>Kitob uchun QR kod:</p>
                <img src={qrCode} alt="Kitob QR kodi" />
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Kitob nomi *</label>
            <input type="text" name="title" required />
          </div>
          
          <div className="form-group">
            <label>Muallif *</label>
            <input type="text" name="author" required />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>ISBN</label>
              <input type="text" name="isbn" />
            </div>
            <div className="form-group">
              <label>Nashr yili</label>
              <input type="number" name="publishYear" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Janr</label>
            <input type="text" name="genre" />
          </div>
          
          <div className="form-group">
            <label>Annotatsiya</label>
            <textarea name="annotation" rows={4}></textarea>
          </div>
          
          <div className="form-group file-group">
            <label>PDF faylni yuklang *</label>
            <input type="file" name="file" accept="application/pdf" required />
          </div>

          <button type="submit" className="btn btn-large" disabled={loading} style={{ width: '100%', marginTop: 'var(--space-md)' }}>
            {loading ? "Yuklanmoqda..." : "Kitobni saqlash"}
          </button>
        </form>
      </div>

      <style>{`
        .upload-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .upload-form-card {
          padding: var(--space-xl);
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .form-group label {
          font-weight: 500;
          color: var(--secondary);
          font-size: 0.9rem;
        }

        .form-group input, .form-group textarea {
          padding: var(--space-sm) var(--space-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-color);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--primary);
        }

        .file-group {
          padding: var(--space-lg);
          border: 2px dashed var(--border);
          border-radius: var(--radius-md);
          text-align: center;
          margin-top: var(--space-sm);
        }

        .success-banner {
          background-color: rgba(16, 185, 129, 0.1);
          border-left: 4px solid var(--success);
          padding: var(--space-md);
          margin-bottom: var(--space-lg);
          border-radius: var(--radius-md);
        }

        .qr-container {
          margin-top: var(--space-sm);
          text-align: center;
        }

        .qr-container img {
          max-width: 150px;
          margin-top: var(--space-sm);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-sm);
        }
      `}</style>
    </div>
  );
}
