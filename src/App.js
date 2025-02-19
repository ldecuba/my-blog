// src/App.js
import React, { useState } from 'react';
import { Navbar, BlogPost, SearchBar, LoginForm } from './components';
import './App.css';

function App() {
  // Blog post data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      date: "February 19, 2025",
      content: "React is an amazing library for building user interfaces...",
      image: "/api/placeholder/600/400",
      comments: []
    },
    {
      id: 2,
      title: "Adding Authentication to Your Blog",
      date: "February 20, 2025",
      content: "Security is important for any web application...",
      image: "/api/placeholder/600/400",
      comments: []
    }
  ]);

  // State management
  const [activePage, setActivePage] = useState('home');
  const [activeUser, setActiveUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle login/logout
  const handleLogin = (user) => {
    setActiveUser(user);
  };

  const handleLogout = () => {
    setActiveUser(null);
  };

  // Handle comments
  const handleAddComment = (postId, commentText) => {
    if (!activeUser) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            text: commentText,
            username: activeUser.username,
            date: new Date().toLocaleDateString()
          }]
        };
      }
      return post;
    }));
  };

  // Filter posts based on search
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render page content
  const renderPage = () => {
    switch (activePage) {
      case 'login':
        return <LoginForm onLogin={handleLogin} setActivePage={setActivePage} />;
      case 'about':
        return (
          <div className="page">
            <h2>About Me</h2>
            <p>Welcome to my blog! I'm passionate about sharing knowledge...</p>
          </div>
        );
      case 'contact':
        return (
          <div className="page">
            <h2>Contact</h2>
            <p>Email: example@email.com</p>
            <p>Twitter: @example</p>
          </div>
        );
      default:
        return (
          <>
            <SearchBar onSearch={setSearchTerm} />
            <div className="blog-posts">
              {filteredPosts.map(post => (
                <BlogPost
                  key={post.id}
                  post={post}
                  onAddComment={handleAddComment}
                  activeUser={activeUser}
                />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>My Blog</h1>
        <Navbar
          activeUser={activeUser}
          onLogout={handleLogout}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </header>

      <main className="main">
        {renderPage()}
      </main>

      <footer className="footer">
        <p>© 2025 My Blog. Created with React.</p>
      </footer>
    </div>
  );
}

export default App;