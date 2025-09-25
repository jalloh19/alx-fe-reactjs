const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
      </div>
      <div className="user-info">
        <h2>{user.name || user.login}</h2>
        <p className="username">@{user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <span>Followers: {user.followers}</span>
          <span>Following: {user.following}</span>
          <span>Repos: {user.public_repos}</span>
        </div>
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;