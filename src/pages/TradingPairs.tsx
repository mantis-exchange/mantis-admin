import { useState } from 'react';
import { riskApi } from '../api/client';

interface Pair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  halted: boolean;
}

export default function TradingPairs() {
  const [pairs, setPairs] = useState<Pair[]>([
    { symbol: 'BTC-USDT', baseAsset: 'BTC', quoteAsset: 'USDT', halted: false },
    { symbol: 'ETH-USDT', baseAsset: 'ETH', quoteAsset: 'USDT', halted: false },
  ]);

  const checkStatus = async (symbol: string) => {
    try {
      const res = await riskApi.get(`/api/v1/risk/status?symbol=${symbol}`);
      setPairs((prev) =>
        prev.map((p) => p.symbol === symbol ? { ...p, halted: res.data.halted } : p)
      );
    } catch {
      // ignore
    }
  };

  // Check status on mount
  useState(() => {
    pairs.forEach((p) => checkStatus(p.symbol));
  });

  return (
    <div style={{ padding: 24 }}>
      <h1>Trading Pairs</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Symbol</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Base</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Quote</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p) => (
            <tr key={p.symbol}>
              <td style={{ padding: 8 }}>{p.symbol}</td>
              <td style={{ padding: 8 }}>{p.baseAsset}</td>
              <td style={{ padding: 8 }}>{p.quoteAsset}</td>
              <td style={{ padding: 8, color: p.halted ? '#f6465d' : '#0ecb81' }}>
                {p.halted ? 'HALTED' : 'Active'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
