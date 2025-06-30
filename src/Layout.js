import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SimCount from './simcount';
import LocalStorage from './LocalStorage';
import TodoList from './todo';
import UserList from './UserList';
import UsersComponent from './UserComponent';
import Active from './ActiveUsers';
import BankApp from './BankApp';
import './App.css';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome to the App</h2>
      <p>Select an option from the navigation.</p>
    </div>
  );
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <h2>React Demo</h2>
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </div>

      {/* Sidebar Menu */}
      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/counter" onClick={() => setMenuOpen(false)}>Simple Counter</Link></li>
          <li><Link to="/lc" onClick={() => setMenuOpen(false)}>LocalStorage Usage</Link></li>
          <li><Link to="/tt" onClick={() => setMenuOpen(false)}>ToDo List</Link></li>
          <li><Link to="/users1" onClick={() => setMenuOpen(false)}>Redux Example</Link></li>
          <li><Link to="/users" onClick={() => setMenuOpen(false)}>Use API</Link></li>
          <li><Link to="/Actusers" onClick={() => setMenuOpen(false)}>Memoization</Link></li>
          <li><Link to="/BankApp" onClick={() => setMenuOpen(false)}>BankApp</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<SimCount />} />
          <Route path="/lc" element={<LocalStorage />} />
          <Route path="/tt" element={<TodoList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users1" element={<UsersComponent />} />
          <Route path="/Actusers" element={<Active />} />
          <Route path="/BankApp" element={<BankApp />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
