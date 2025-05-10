import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatIndianCurrency } from '../utils/currencyUtils';

function Home() {
  // Employee data with activity tracking - current date: May 10, 2025
  const [recentActivities, setRecentActivities] = useState([
    { name: 'Aarav Sharma', action: 'checked in', time: '09:15 AM', date: 'May 10, 2025' },
    { name: 'Ananya Patel', action: 'requested leave', time: '10:30 AM', date: 'May 10, 2025' },
    { name: 'Vihaan Malhotra', action: 'updated profile', time: '11:45 AM', date: 'May 10, 2025' },
    { name: 'Diya Reddy', action: 'checked out', time: '06:05 PM', date: 'May 9, 2025' },
    { name: 'Arjun Singh', action: 'submitted report', time: '04:20 PM', date: 'May 10, 2025' }
  ]);
  
  // Financial summary data
  const [financialData, setFinancialData] = useState({
    totalSalary: 1824500,
    averageSalary: 76020,
    pendingReimbursements: 45750,
    lastMonthPayroll: 1795200
  });
  
  // Simulate data loading
  useEffect(() => {
    // This would typically be an API call in a real application
    const timer = setTimeout(() => {
      // Update with fresh data if needed
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      <h1>Employee Management Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Welcome to Employee Tracker</h2>
          <p>Access all employee management features through the sidebar navigation.</p>
          
          <ul className="feature-list">
            <li>Track employee locations across India and globally</li>
            <li>Manage payroll and salary information in INR</li>
            <li>Monitor attendance and working hours</li>
            <li>Process leave requests and approvals</li>
          </ul>
          
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li key={index} className="activity-item">
                  <span className="activity-name">{activity.name}</span>
                  <span className="activity-action">{activity.action}</span>
                  <span className="activity-time">{activity.time}</span>
                  <span className="activity-date">{activity.date}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="quick-links">
            <h3>Quick Links</h3>
            <div className="links-container">
              <Link to="/map" className="quick-link">
                <i className="fas fa-map-marked-alt"></i>
                <span>Employee Map</span>
              </Link>
              <Link to="/payroll" className="quick-link">
                <i className="fas fa-money-bill-wave"></i>
                <span>Payroll</span>
              </Link>
              <Link to="/attendance" className="quick-link">
                <i className="fas fa-calendar-check"></i>
                <span>Attendance</span>
              </Link>
              <Link to="/leave" className="quick-link">
                <i className="fas fa-calendar-minus"></i>
                <span>Leave Management</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Employees</h3>
            <div className="stat-value">24</div>
          </div>
          <div className="stat-card">
            <h3>Present Today</h3>
            <div className="stat-value">22</div>
          </div>
          <div className="stat-card">
            <h3>Monthly Payroll</h3>
            <div className="stat-value">{formatIndianCurrency(financialData.totalSalary)}</div>
          </div>
          <div className="stat-card">
            <h3>Pending Claims</h3>
            <div className="stat-value">{formatIndianCurrency(financialData.pendingReimbursements)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;