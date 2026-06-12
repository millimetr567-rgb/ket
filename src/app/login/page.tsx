"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Email yoki parol noto'g'ri!");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass">
        <div className="login-header">
          <h2>Tizimga kirish</h2>
          <p>Kutubxona Elektron Tizimi</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@ket.uz"
            />
          </div>
          <div className="form-group">
            <label>Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>
        
        <div className="login-footer">
          <Link href="/" className="back-link">&larr; Bosh sahifaga qaytish</Link>
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
          max-width: 400px;
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

        .login-header p {
          color: var(--secondary);
          font-size: 0.9rem;
        }

        .error-message {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          padding: var(--space-sm);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-md);
          text-align: center;
          font-size: 0.9rem;
          border: 1px solid rgba(239, 68, 68, 0.3);
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

        .form-group input {
          padding: var(--space-sm) var(--space-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
          color: var(--text-color);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-group input:focus {
          border-color: var(--primary);
        }

        .login-form .btn {
          margin-top: var(--space-sm);
          width: 100%;
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
