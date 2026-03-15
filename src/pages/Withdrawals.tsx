export default function Withdrawals() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Withdrawal Approval Queue</h1>
      <p style={{ color: '#848e9c' }}>
        Pending withdrawals requiring manual review. Connect to mantis-wallet API.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>ID</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>User</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Asset</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Amount</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} style={{ padding: 24, textAlign: 'center', color: '#848e9c' }}>
              No pending withdrawals
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
