// src/components/Navbar.js
import React from 'react';

const Navbar = ({ activeUser, onLogout, activePage, setActivePage }) => {
  const menuItems = ['home', 'about', 'contact'];
  
  return (
    <nav className="nav-menu">
      <div className="nav-links">
        {menuItems.map(item => (
          <button
            key={item}
            className={`nav-item ${activePage === item ? 'active' : ''}`}
            onClick={() => setActivePage(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
      <div className="auth-section">
        {activeUser ? (
          <>
            <span className="user-welcome">Welcome, {activeUser.username}</span>
            <button className="auth-button" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button 
            className="auth-button" 
            onClick={() => setActivePage('login')}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

// src/components/BlogPost.js
const BlogPost = ({ post, onAddComment, activeUser }) => {
  const [newComment, setNewComment] = React.useState('');

  const handleComment = () => {
    if (!activeUser) {
      alert('Please login to comment');
      return;
    }
    onAddComment(post.id, newComment);
    setNewComment('');
  };

  return (
    <article className="post">
      <h2>{post.title}</h2>
      <p className="date">{post.date}</p>
      <img src={post.image} alt={post.title} className="post-image" />
      <p>{post.content}</p>
      
      <div className="comments-section">
        <h3>Comments ({post.comments.length})</h3>
        {post.comments.map(comment => (
          <div key={comment.id} className="comment">
            <strong>{comment.username}</strong>
            <p>{comment.text}</p>
            <small>{comment.date}</small>
          </div>
        ))}
        
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={activeUser ? "Write a comment..." : "Please login to comment"}
            disabled={!activeUser}
          />
          <button 
            onClick={handleComment}
            disabled={!activeUser || !newComment.trim()}
          >
            Add Comment
          </button>
        </div>
      </div>
    </article>
  );
};

// src/components/SearchBar.js
const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

// src/components/LoginForm.js
const LoginForm = ({ onLogin, setActivePage }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple authentication - in real app, you'd want to use proper authentication
    if (username && password) {
      onLogin({ username });
      setActivePage('home');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export { Navbar, BlogPost, SearchBar, LoginForm };