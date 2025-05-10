import React, { useState, useEffect } from 'react';
import { formatIndianCurrency } from '../utils/currencyUtils';

function Attendance() {
  // Calculate work hours from check-in and check-out times
  const calculateWorkHours = (checkIn, checkOut) => {
    if (checkIn === '-' || checkOut === '-') return 0;
    
    // Parse times (simplified for demonstration)
    const inTime = checkIn.includes('PM') && !checkIn.startsWith('12') 
      ? parseInt(checkIn.split(':')[0]) + 12 + parseInt(checkIn.split(':')[1])/60 
      : parseInt(checkIn.split(':')[0]) + parseInt(checkIn.split(':')[1])/60;
      
    const outTime = checkOut.includes('PM') && !checkOut.startsWith('12') 
      ? parseInt(checkOut.split(':')[0]) + 12 + parseInt(checkOut.split(':')[1])/60 
      : parseInt(checkOut.split(':')[0]) + parseInt(checkOut.split(':')[1])/60;
    
    return (outTime - inTime).toFixed(2);
  };

  // Attendance data with work hours and overtime pay
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 'EMP001',
      name: 'Aarav Sharma',
      date: 'May 10, 2025',
      checkIn: '8:55 AM',
      checkOut: '5:05 PM',
      status: 'present',
      workHours: 8.17,
      overtime: 0.17,
      overtimePay: 425
    },
    {
      id: 'EMP007',
      name: 'Ananya Patel',
      date: 'May 10, 2025',
      checkIn: '9:10 AM',
      checkOut: '5:30 PM',
      status: 'late',
      workHours: 8.33,
      overtime: 0.33,
      overtimePay: 700
    },
    {
      id: 'EMP013',
      name: 'Vihaan Malhotra',
      date: 'May 10, 2025',
      checkIn: '8:45 AM',
      checkOut: '5:15 PM',
      status: 'present',
      workHours: 8.5,
      overtime: 0.5,
      overtimePay: 975
    },
    {
      id: 'EMP018',
      name: 'Diya Reddy',
      date: 'May 10, 2025',
      checkIn: '-',
      checkOut: '-',
      status: 'absent',
      workHours: 0,
      overtime: 0,
      overtimePay: 0
    },
    {
      id: 'EMP022',
      name: 'Arjun Singh',
      date: 'May 10, 2025',
      checkIn: '8:50 AM',
      checkOut: '5:20 PM',
      status: 'present',
      workHours: 8.5,
      overtime: 0.5,
      overtimePay: 850
    }
  ]);
  
  // Attendance summary with financial data
  const [attendanceSummary, setAttendanceSummary] = useState({
    presentToday: 22,
    presentPercentage: 91.7,
    absent: 2,
    absentPercentage: 8.3,
    lateArrivals: 3,
    latePercentage: 12.5,
    totalOvertimeHours: 42.5,
    totalOvertimePay: 76500
  });
  
  // Simulate data loading
  useEffect(() => {
    // This would typically be an API call in a real application
    const timer = setTimeout(() => {
      // Update with fresh data if needed
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="attendance-page">
      <h1>Employee Attendance</h1>
      <div className="attendance-content">
        
        <div className="attendance-calendar">
          <h2>Monthly Attendance</h2>
          <div className="calendar-container">
            <div className="calendar-header">
              <h3>May 2025</h3>
              <div className="calendar-nav">
                <button className="calendar-nav-btn"><i className="fas fa-chevron-left"></i></button>
                <button className="calendar-nav-btn"><i className="fas fa-chevron-right"></i></button>
              </div>
            </div>
            <table className="calendar">
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="inactive">28</td>
                  <td className="inactive">29</td>
                  <td className="inactive">30</td>
                  <td className="inactive">31</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="present">5</td>
                  <td className="present">6</td>
                  <td className="present">7</td>
                  <td className="present">8</td>
                  <td className="present">9</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td className="present">12</td>
                  <td className="present">13</td>
                  <td className="absent">14</td>
                  <td className="present">15</td>
                  <td className="present">16</td>
                  <td>17</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td className="present">19</td>
                  <td className="late">20</td>
                  <td className="present">21</td>
                  <td className="present">22</td>
                  <td className="present">23</td>
                  <td>24</td>
                </tr>
                <tr>
                  <td>25</td>
                  <td className="present">26</td>
                  <td className="present">27</td>
                  <td className="present">28</td>
                  <td className="present">29</td>
                  <td className="present">30</td>
                  <td className="inactive">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="attendance-log">
          <h2>Recent Attendance Log</h2>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Overtime Pay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.date}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>{record.workHours > 0 ? record.workHours : '-'}</td>
                  <td>{record.overtimePay > 0 ? formatIndianCurrency(record.overtimePay) : '-'}</td>
                  <td>
                    <span className={`status-badge ${record.status}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;