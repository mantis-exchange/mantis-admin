import { useEffect, useState } from 'react';

interface Stats {
  services: { name: string; status: string }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ services: [] });

  useEffect(() => {
    const services = [
      { name: 'Gateway', url: 'http://localhost:8080/health' },
      { name: 'Account', url: 'http://localhost:50053/api/v1/account' },
      { name: 'Market Data', url: 'http://localhost:8081/api/v1/klines?symbol=BTC-USDT&limit=1' },
    ];

    Promise.all(
      services.map(async (s) => {
        try {
          await fetch(s.url, { signal: AbortSignal.timeout(3000) });
          return { name: s.name, status: 'UP' };
        } catch {
          return { name: s.name, status: 'DOWN' };
        }
      })
    ).then((results) => setStats({ services: results }));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Mantis Admin</h1>
      <h2>System Status</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Service</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {stats.services.map((s) => (
            <tr key={s.name}>
              <td style={{ padding: 8 }}>{s.name}</td>
              <td style={{ padding: 8, color: s.status === 'UP' ? '#0ecb81' : '#f6465d' }}>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
