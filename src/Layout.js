import React from 'react';
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
      <p>Select an option from the navigation above.</p>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav className="container">
        <ul>
            <li><Link to="/counter" className="box">Simple Counter</Link></li>
            <li><Link to="/lc" className="box">LocalStorage Usage</Link></li>
            <li><Link to="/tt" className="box">ToDo List</Link></li>
            <li><Link to="/users1" className="box">Redux Example</Link></li>
            <li><Link to="/users" className="box">Use API</Link></li>
            <li><Link to="/Actusers" className="box">Memoization</Link></li>
            <li><Link to="/BankApp" className="box">Redux example with BankApp</Link></li>
        </ul>
      </nav>

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
  );
}

export default Layout;
