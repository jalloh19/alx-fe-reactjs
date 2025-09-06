function UserProfile(props) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '12px',
      margin: '12px',
      maxWidth: '320px',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ color: '#1a73e8', margin: '0 0 8px 0' }}>{props.name}</h2>
      <p style={{ margin: '4px 0' }}>Age: <span style={{ fontWeight: '700' }}>{props.age}</span></p>
      <p style={{ margin: '4px 0', color: '#555' }}>Bio: {props.bio}</p>
    </div>
  );
}

export default UserProfile;

