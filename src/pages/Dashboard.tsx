import { useEffect, useState } from 'react';
import { gatewayApi, accountApi, riskApi } from '../api/client';

interface ServiceStatus {
  name: string;
  status: string;
}

export default function Dashboard() {
  const [services, setServices] = useState<ServiceStatus[]>([]);

  useEffect(() => {
    const checks = [
      { name: 'Gateway', fn: () => gatewayApi.get('/health') },
      { name: 'Account', fn: () => accountApi.get('/api/v1/account/register') },
      { name: 'Risk', fn: () => riskApi.get('/api/v1/risk/status') },
    ];

    Promise.all(
      checks.map(async (s) => {
        try {
          await s.fn();
          return { name: s.name, status: 'UP' };
        } catch (err: unknown) {
          // A non-network error (like 400/405) still means service is up
          if (err && typeof err === 'object' && 'response' in err) {
            return { name: s.name, status: 'UP' };
          }
          return { name: s.name, status: 'DOWN' };
        }
      })
    ).then(setServices);
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
          {services.map((s) => (
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
