import React, { useState, useEffect } from 'react';
import { formatIndianCurrency } from '../utils/currencyUtils';

function Payroll() {
  // Employee payroll data state - current date: May 10, 2025
  const [payrollData, setPayrollData] = useState([
    {
      id: 'EMP001',
      name: 'Arjun Sharma',
      position: 'Senior Developer',
      department: 'Engineering',
      baseSalary: 95000,
      bonus: 15000,
      total: 110000,
      lastUpdated: '10 May 2025'
    },
    {
      id: 'EMP007',
      name: 'Ananya Patel',
      position: 'Marketing Manager',
      department: 'Marketing',
      baseSalary: 85000,
      bonus: 12000,
      total: 97000,
      lastUpdated: '10 May 2025'
    },
    {
      id: 'EMP013',
      name: 'Vihaan Malhotra',
      position: 'UX Designer',
      department: 'Design',
      baseSalary: 78000,
      bonus: 8000,
      total: 86000,
      lastUpdated: '10 May 2025'
    },
    {
      id: 'EMP018',
      name: 'Diya Reddy',
      position: 'HR Specialist',
      department: 'Human Resources',
      baseSalary: 72000,
      bonus: 7500,
      total: 79500,
      lastUpdated: '10 May 2025'
    },
    {
      id: 'EMP022',
      name: 'Aarav Singh',
      position: 'Sales Representative',
      department: 'Sales',
      baseSalary: 68000,
      bonus: 22000,
      total: 90000,
      lastUpdated: '10 May 2025'
    }
  ]);
  
  const [payrollSummary, setPayrollSummary] = useState({
    totalEmployees: 24,
    monthlyPayroll: 1824500,
    averageSalary: 76020,
    topPerformer: 'Aarav Singh'
  });
  
  // Simulate data loading
  useEffect(() => {
    // This would typically be an API call in a real application
    const timer = setTimeout(() => {
      // Update with fresh data if needed
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payroll-page">
      <h1>Employee Payroll</h1>
      <div className="payroll-content">
        
        <div className="payroll-table-container">
          <h2>Current Month Payroll</h2>
          <table className="payroll-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Base Salary</th>
                <th>Bonus</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{formatIndianCurrency(employee.baseSalary)}</td>
                  <td>{formatIndianCurrency(employee.bonus)}</td>
                  <td>{formatIndianCurrency(employee.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payroll;