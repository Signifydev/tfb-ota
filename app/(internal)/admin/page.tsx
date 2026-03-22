"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operations");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);

    const res = await fetch("/api/admin/create-user", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("User created successfully!");
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="User Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="operations">Operations</option>
          <option value="sales">Sales</option>
        </select>

        <button
          onClick={handleCreateUser}
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
}