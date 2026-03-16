import { useEffect, useState } from 'react';
import { walletApi } from '../api/client';

interface Withdrawal {
  id: string;
  user_id: string;
  asset: string;
  amount: string;
  to_address: string;
  status: string;
  created_at: string;
}

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = () => {
    walletApi.get('/internal/v1/withdrawals/pending')
      .then((res) => setWithdrawals(res.data.withdrawals || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchWithdrawals(); }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      await walletApi.put(`/internal/v1/withdrawals/${id}`, { action });
      fetchWithdrawals();
    } catch (err) {
      console.error('Failed to update withdrawal:', err);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Withdrawal Approval Queue</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>ID</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>User</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Asset</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Amount</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>To Address</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} style={{ padding: 24, textAlign: 'center', color: '#848e9c' }}>Loading...</td></tr>
          ) : withdrawals.length === 0 ? (
            <tr><td colSpan={6} style={{ padding: 24, textAlign: 'center', color: '#848e9c' }}>No pending withdrawals</td></tr>
          ) : (
            withdrawals.map((w) => (
              <tr key={w.id}>
                <td style={{ padding: 8, fontFamily: 'monospace', fontSize: 12 }}>{w.id.slice(0, 8)}...</td>
                <td style={{ padding: 8, fontFamily: 'monospace', fontSize: 12 }}>{w.user_id.slice(0, 8)}...</td>
                <td style={{ padding: 8 }}>{w.asset}</td>
                <td style={{ padding: 8 }}>{w.amount}</td>
                <td style={{ padding: 8, fontFamily: 'monospace', fontSize: 11 }}>{w.to_address.slice(0, 10)}...</td>
                <td style={{ padding: 8, display: 'flex', gap: 8 }}>
                  <button onClick={() => handleAction(w.id, 'approve')} style={{ background: '#0ecb81', border: 'none', color: 'white', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}>Approve</button>
                  <button onClick={() => handleAction(w.id, 'reject')} style={{ background: '#f6465d', border: 'none', color: 'white', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}>Reject</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
