"use client";

import { useState, useEffect } from "react";

export default function ApprovalsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/approvals");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId: string, action: "APPROVE" | "REJECT") => {
    if (!confirm(`Haqiqatan ham ushbu foydalanuvchini ${action === "APPROVE" ? "tasdiqlaysizmi" : "rad etasizmi"}?`)) return;

    try {
      const res = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
      } else {
        alert("Xatolik yuz berdi");
      }
    } catch (err) {
      alert("Tarmoq xatosi");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "var(--space-lg)" }}>Arizalar va Tasdiqlash</h1>
      
      <div className="glass" style={{ padding: "var(--space-lg)", borderRadius: "var(--radius-lg)" }}>
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : users.length === 0 ? (
          <p>Yangi arizalar yo'q.</p>
        ) : (
          <table className="approvals-table">
            <thead>
              <tr>
                <th>Ism</th>
                <th>Email</th>
                <th>Viloyat</th>
                <th>Tuman</th>
                <th>Rol (so'ralgan)</th>
                <th>Harakat</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.viloyat?.name || "-"}</td>
                  <td>{user.tuman?.name || "-"}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => handleAction(user.id, "APPROVE")} className="btn btn-approve">Tasdiqlash</button>
                      <button onClick={() => handleAction(user.id, "REJECT")} className="btn btn-reject">Rad etish</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .approvals-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .approvals-table th, .approvals-table td {
          padding: var(--space-md);
          border-bottom: 1px solid var(--border);
        }

        .actions {
          display: flex;
          gap: var(--space-sm);
        }

        .btn-approve {
          background-color: var(--success);
        }
        .btn-approve:hover {
          background-color: #059669;
        }

        .btn-reject {
          background-color: var(--danger);
        }
        .btn-reject:hover {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
}
