import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Employee Tracker</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">
              <i className="fas fa-map-marked-alt"></i>
              <span>Employee Map</span>
            </Link>
          </li>
          <li className={location.pathname === '/payroll' ? 'active' : ''}>
            <Link to="/payroll">
              <i className="fas fa-money-bill-wave"></i>
              <span>Payroll</span>
            </Link>
          </li>
          <li className={location.pathname === '/attendance' ? 'active' : ''}>
            <Link to="/attendance">
              <i className="fas fa-calendar-check"></i>
              <span>Attendance</span>
            </Link>
          </li>
          <li className={location.pathname === '/leave' ? 'active' : ''}>
            <Link to="/leave">
              <i className="fas fa-calendar-minus"></i>
              <span>Leave Management</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>© 2025 Employee Tracker</p>
      </div>
    </div>
  );
}

export default Sidebar;