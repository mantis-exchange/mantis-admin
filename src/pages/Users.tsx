export default function Users() {
  return (
    <div style={{ padding: 24 }}>
      <h1>User Management</h1>
      <p style={{ color: '#848e9c' }}>
        User listing, KYC review, and account freeze/unfreeze.
        Connect to mantis-account API to populate.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>ID</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Email</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Verified</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#848e9c' }}>
              No users loaded — connect admin API
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
