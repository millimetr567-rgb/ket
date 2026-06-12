"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [viloyatId, setViloyatId] = useState("");
  const [tumanId, setTumanId] = useState("");
  const [isViloyatAdmin, setIsViloyatAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  const selectedViloyat = locations.find((v) => v.id === viloyatId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      viloyatId,
      tumanId,
      isViloyatAdmin,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error);
      
      setSuccess(resData.message);
      (e.target as HTMLFormElement).reset();
      setViloyatId("");
      setTumanId("");
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass" style={{ maxWidth: '500px' }}>
        <div className="login-header">
          <h2>Ro'yxatdan o'tish</h2>
          <p>Tizimga kirish huquqini olish uchun ariza qoldiring</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-banner" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Ism va Familiya</label>
            <input type="text" name="name" required />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          
          <div className="form-group">
            <label>Parol</label>
            <input type="password" name="password" required />
          </div>

          <div className="form-group">
            <label>Viloyatni tanlang</label>
            <select value={viloyatId} onChange={(e) => { setViloyatId(e.target.value); setTumanId(""); }} required>
              <option value="">Viloyat...</option>
              {locations.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="viloyatAdmin" checked={isViloyatAdmin} onChange={(e) => setIsViloyatAdmin(e.target.checked)} />
            <label htmlFor="viloyatAdmin">Men viloyat administratoriman (tuman tanlanmaydi)</label>
          </div>

          {!isViloyatAdmin && selectedViloyat && (
            <div className="form-group">
              <label>Tumanni tanlang</label>
              <select value={tumanId} onChange={(e) => setTumanId(e.target.value)} required>
                <option value="">Tuman...</option>
                {selectedViloyat.tumans.map((t: any) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Yuborilmoqda..." : "Ariza yuborish"}
          </button>
        </form>
        
        <div className="login-footer">
          <Link href="/login" className="back-link">Allaqachon ro'yxatdan o'tganmisiz? Kirish</Link>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top left, var(--bg-color) 0%, rgba(37, 99, 235, 0.05) 100%);
          padding: var(--space-lg);
        }

        .login-card {
          width: 100%;
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }

        .login-header h2 {
          color: var(--primary);
          margin-bottom: var(--space-xs);
        }

        .error-message {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          padding: var(--space-sm);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-md);
          text-align: center;
        }

        .login-form {
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
          font-weight: 500;
          color: var(--secondary);
        }

        .form-group input, .form-group select {
          padding: var(--space-sm) var(--space-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
          color: var(--text-color);
          outline: none;
        }

        .login-form .btn {
          margin-top: var(--space-sm);
        }

        .login-footer {
          margin-top: var(--space-lg);
          text-align: center;
        }

        .back-link {
          font-size: 0.85rem;
          color: var(--secondary);
          text-decoration: none;
        }

        .back-link:hover {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
