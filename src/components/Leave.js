import React, { useState, useEffect } from 'react';
import { formatIndianCurrency } from '../utils/currencyUtils';

function Leave() {
  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'error'
  });
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    leaveId: null,
    employeeName: ''
  });
  // Leave request data with employee details
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 'LR2025-056',
      name: 'Aarav Sharma',
      type: 'Vacation',
      from: 'May 15, 2025',
      to: 'May 19, 2025',
      days: 5,
      reason: 'Family vacation',
      status: 'pending',
      compensation: 23500
    },
    {
      id: 'LR2025-052',
      name: 'Ananya Patel',
      type: 'Sick Leave',
      from: 'May 12, 2025',
      to: 'May 13, 2025',
      days: 2,
      reason: 'Fever',
      status: 'approved',
      compensation: 8500
    },
    {
      id: 'LR2025-055',
      name: 'Vihaan Malhotra',
      type: 'Personal Leave',
      from: 'May 14, 2025',
      to: 'May 14, 2025',
      days: 1,
      reason: 'Personal matter',
      status: 'pending',
      compensation: 3900
    },
    {
      id: 'LR2025-058',
      name: 'Diya Reddy',
      type: 'Vacation',
      from: 'May 20, 2025',
      to: 'May 24, 2025',
      days: 5,
      reason: 'Summer break',
      status: 'pending',
      compensation: 18000
    },
    {
      id: 'LR2025-043',
      name: 'Arjun Singh',
      type: 'Sick Leave',
      from: 'May 8, 2025',
      to: 'May 9, 2025',
      days: 2,
      reason: 'Cold and fever',
      status: 'rejected',
      compensation: 9500
    }
  ]);

  // Leave balance data with financial implications
  const [leaveBalances, setLeaveBalances] = useState([
    {
      id: 'EMP001',
      name: 'Aarav Sharma',
      vacation: '15/20',
      sickLeave: '8/10',
      personal: '3/5',
      total: '26/35',
      encashable: 5,
      encashValue: 23500
    },
    {
      id: 'EMP007',
      name: 'Ananya Patel',
      vacation: '12/20',
      sickLeave: '6/10',
      personal: '4/5',
      total: '22/35',
      encashable: 8,
      encashValue: 34000
    },
    {
      id: 'EMP013',
      name: 'Vihaan Malhotra',
      vacation: '18/20',
      sickLeave: '9/10',
      personal: '2/5',
      total: '29/35',
      encashable: 2,
      encashValue: 7800
    },
    {
      id: 'EMP018',
      name: 'Diya Reddy',
      vacation: '10/20',
      sickLeave: '7/10',
      personal: '5/5',
      total: '22/35',
      encashable: 10,
      encashValue: 36000
    },
    {
      id: 'EMP022',
      name: 'Arjun Singh',
      vacation: '16/20',
      sickLeave: '5/10',
      personal: '3/5',
      total: '24/35',
      encashable: 4,
      encashValue: 19000
    }
  ]);
  
  // Leave financial summary
  const [leaveSummary, setLeaveSummary] = useState({
    pendingRequests: 5,
    approvedThisMonth: 12,
    rejectedThisMonth: 3,
    totalEncashmentValue: 120300
  });
  
  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };
  
  // Handle leave approval
  const handleApproveLeave = (leaveId) => {
    // Find the employee name for the notification
    const request = leaveRequests.find(req => req.id === leaveId);
    const employeeName = request ? request.name : 'Employee';
    
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === leaveId 
          ? { ...request, status: 'approved' } 
          : request
      )
    );
    
    // Update summary counts
    setLeaveSummary(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      approvedThisMonth: prev.approvedThisMonth + 1
    }));
    
    // Show success notification
    showNotification(`Leave request for ${employeeName} has been approved`);
  };
  
  // Show confirmation dialog for rejection
  const showRejectConfirmation = (leaveId) => {
    // Find the employee name for the confirmation
    const request = leaveRequests.find(req => req.id === leaveId);
    const employeeName = request ? request.name : 'Employee';
    
    setConfirmDialog({
      show: true,
      leaveId,
      employeeName
    });
  };
  
  // Handle leave rejection
  const handleRejectLeave = (leaveId) => {
    // Find the employee name for the notification
    const request = leaveRequests.find(req => req.id === leaveId);
    const employeeName = request ? request.name : 'Employee';
    
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === leaveId 
          ? { ...request, status: 'rejected' } 
          : request
      )
    );
    
    // Update summary counts
    setLeaveSummary(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      rejectedThisMonth: prev.rejectedThisMonth + 1
    }));
    
    // Close confirmation dialog
    setConfirmDialog({
      show: false,
      leaveId: null,
      employeeName: ''
    });
    
    // Show notification
    showNotification(`Leave request for ${employeeName} has been rejected`, 'error');
  };
  
  // Cancel rejection
  const cancelRejection = () => {
    setConfirmDialog({
      show: false,
      leaveId: null,
      employeeName: ''
    });
  };
  
  // Simulate data loading
  useEffect(() => {
    // This would typically be an API call in a real application
    const timer = setTimeout(() => {
      // Update with fresh data if needed
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="leave-page">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button 
            className="close-notification" 
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
      {/* Confirmation Dialog */}
      {confirmDialog.show && (
        <div className="confirmation-dialog-overlay">
          <div className="confirmation-dialog">
            <h3>Confirm Rejection</h3>
            <p>Are you sure you want to reject the leave request for <strong>{confirmDialog.employeeName}</strong>?</p>
            <div className="confirmation-actions">
              <button 
                className="btn-cancel" 
                onClick={cancelRejection}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm" 
                onClick={() => handleRejectLeave(confirmDialog.leaveId)}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
      
      <h1>Leave Management</h1>
      <div className="leave-content">
        
        <div className="leave-requests">
          <h2>Leave Requests</h2>
          
          <table className="leave-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Compensation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.type}</td>
                  <td>{request.from}</td>
                  <td>{request.to}</td>
                  <td>{request.days}</td>
                  <td>{formatIndianCurrency(request.compensation)}</td>
                  <td>
                    <span className={`status-badge ${request.status}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {request.status === 'pending' ? (
                      <>
                        <button 
                          className="action-btn approve" 
                          onClick={() => handleApproveLeave(request.id)}
                          title="Approve Leave"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button 
                          className="action-btn reject" 
                          onClick={() => showRejectConfirmation(request.id)}
                          title="Reject Leave"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    ) : (
                      <button className="action-btn view" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="leave-balance">
          <h2>Team Leave Balance & Encashment</h2>
          <table className="balance-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Vacation</th>
                <th>Sick Leave</th>
                <th>Personal</th>
                <th>Total Available</th>
                <th>Encashable Days</th>
                <th>Encashment Value</th>
              </tr>
            </thead>
            <tbody>
              {leaveBalances.map((balance, index) => (
                <tr key={index}>
                  <td>{balance.id}</td>
                  <td>{balance.name}</td>
                  <td>{balance.vacation}</td>
                  <td>{balance.sickLeave}</td>
                  <td>{balance.personal}</td>
                  <td>{balance.total}</td>
                  <td>{balance.encashable}</td>
                  <td>{formatIndianCurrency(balance.encashValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leave;