import { useEffect, useState } from 'react';
import { accountApi } from '../api/client';

interface User {
  id: string;
  email: string;
  is_verified: boolean;
  created_at: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    accountApi.get('/internal/v1/users')
      .then((res) => setUsers(res.data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>User Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>ID</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Email</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Verified</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#848e9c' }}>Loading...</td></tr>
          ) : users.length === 0 ? (
            <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#848e9c' }}>No users found</td></tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: 8, fontFamily: 'monospace', fontSize: 12 }}>{u.id.slice(0, 8)}...</td>
                <td style={{ padding: 8 }}>{u.email}</td>
                <td style={{ padding: 8, color: u.is_verified ? '#0ecb81' : '#848e9c' }}>{u.is_verified ? 'Yes' : 'No'}</td>
                <td style={{ padding: 8, color: '#848e9c', fontSize: 12 }}>{new Date(u.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
