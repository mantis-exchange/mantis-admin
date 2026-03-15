export default function TradingPairs() {
  const pairs = [
    { symbol: 'BTC-USDT', status: 'Active', baseAsset: 'BTC', quoteAsset: 'USDT' },
    { symbol: 'ETH-USDT', status: 'Active', baseAsset: 'ETH', quoteAsset: 'USDT' },
  ];

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
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p) => (
            <tr key={p.symbol}>
              <td style={{ padding: 8 }}>{p.symbol}</td>
              <td style={{ padding: 8 }}>{p.baseAsset}</td>
              <td style={{ padding: 8 }}>{p.quoteAsset}</td>
              <td style={{ padding: 8, color: '#0ecb81' }}>{p.status}</td>
              <td style={{ padding: 8 }}>
                <button style={{ background: '#f6465d', border: 'none', color: 'white', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}>
                  Halt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
