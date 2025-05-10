import React, { useState, useEffect, useRef } from 'react';
import API from '../utils/api';
import MapChart from '../MapChart';
import './MapDropdown.css';

function MapPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Indian names data
  const firstNames = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Reyansh', 'Ayaan', 'Atharva', 
    'Krishna', 'Ishaan', 'Shaurya', 'Advik', 'Rudra', 'Pranav', 'Advaith', 'Kabir', 
    'Ananya', 'Aanya', 'Aadhya', 'Aaradhya', 'Diya', 'Myra', 'Sara', 'Pari', 
    'Anika', 'Navya', 'Saanvi', 'Kiara', 'Avni', 'Aisha', 'Riya', 'Ira'
  ];
  
  const lastNames = [
    'Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Joshi', 'Rao', 
    'Reddy', 'Malhotra', 'Chopra', 'Nair', 'Mehta', 'Shah', 'Agarwal', 'Iyer', 
    'Pillai', 'Desai', 'Kapoor', 'Chauhan', 'Yadav', 'Tiwari', 'Patil', 'Kaur', 
    'Mukherjee', 'Chatterjee', 'Banerjee', 'Saxena', 'Bose', 'Trivedi', 'Naidu', 'Menon'
  ];
  
  const departments = [
    'Engineering', 'Marketing', 'Finance', 'Human Resources', 'Operations', 
    'Sales', 'Customer Support', 'Research & Development', 'Legal', 'Product Management'
  ];
  
  const positions = [
    'Software Engineer', 'Marketing Specialist', 'Financial Analyst', 'HR Manager', 
    'Operations Coordinator', 'Sales Representative', 'Customer Support Specialist', 
    'Research Scientist', 'Legal Counsel', 'Product Manager', 'Data Analyst', 
    'UX Designer', 'Content Writer', 'Project Manager', 'Business Analyst'
  ];

  // Generate a random Indian name
  const getRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  // Generate a random department
  const getRandomDepartment = () => {
    return departments[Math.floor(Math.random() * departments.length)];
  };

  // Generate a random position
  const getRandomPosition = () => {
    return positions[Math.floor(Math.random() * positions.length)];
  };

  // Initial data fetch
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const employeesRef = useRef(employees);
  const selectedEmployeeRef = useRef(selectedEmployee);
  const tooltipRef = useRef(tooltip);
  
  useEffect(() => {
    employeesRef.current = employees;
  }, [employees]);
  
  useEffect(() => {
    selectedEmployeeRef.current = selectedEmployee;
  }, [selectedEmployee]);
  
  useEffect(() => {
    tooltipRef.current = tooltip;
  }, [tooltip]);
  
  const updateEmployeeLocations = () => {
    const now = new Date();
    const currentEmployees = employeesRef.current;
    
    if (!currentEmployees || currentEmployees.length === 0) return;
    
    const updatedEmployees = currentEmployees.map(employee => {
      const latChange = (Math.random() * 0.02 - 0.01);
      const lngChange = (Math.random() * 0.02 - 0.01);
      
      const newLat = (parseFloat(employee.latitude) + latChange).toFixed(6);
      const newLng = (parseFloat(employee.longitude) + lngChange).toFixed(6);
      
      return {
        ...employee,
        latitude: newLat,
        longitude: newLng,
        timestamp: now.toISOString()
      };
    });
    
    setEmployees(updatedEmployees);
    
    const currentSelectedEmployee = selectedEmployeeRef.current;
    if (currentSelectedEmployee) {
      const updatedSelectedEmployee = updatedEmployees.find(
        emp => emp.id === currentSelectedEmployee.id
      );
      if (updatedSelectedEmployee) {
        setSelectedEmployee(updatedSelectedEmployee);
      }
    }
    
    const currentTooltip = tooltipRef.current;
    if (currentTooltip) {
      const updatedTooltipEmployee = updatedEmployees.find(
        emp => emp.id === currentTooltip.employee.id
      );
      if (updatedTooltipEmployee) {
        setTooltip({
          employee: updatedTooltipEmployee,
          coordinates: [parseFloat(updatedTooltipEmployee.longitude), parseFloat(updatedTooltipEmployee.latitude)]
        });
      }
    }
  };
  
  useEffect(() => {
    const pollingInterval = setInterval(updateEmployeeLocations, 1000);
    
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/employees');
      
      const updatedEmployees = response.data.map(employee => ({
        ...employee,
        name: getRandomName(),
        department: getRandomDepartment(),
        position: getRandomPosition()
      }));
      
      setEmployees(updatedEmployees);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching employee data:', err);
      setError('Failed to load employee data. Please try again later.');
      setLoading(false);
      
      if (employees.length === 0) {
        const mockEmployees = Array(10).fill(0).map((_, index) => ({
          id: `EMP${index + 1}`.padStart(6, '0'),
          name: getRandomName(),
          department: getRandomDepartment(),
          position: getRandomPosition(),
          latitude: (Math.random() * 140 - 70).toFixed(6),
          longitude: (Math.random() * 340 - 170).toFixed(6),
          timestamp: new Date().toISOString()
        }));
        setEmployees(mockEmployees);
        setLoading(false);
      }
    }
  };

  const generateRandomLocations = async () => {
    try {
      const currentEmployees = employeesRef.current;
      
      if (!currentEmployees || currentEmployees.length === 0) {
        return;
      }
      
      const now = new Date();
      const updatedEmployees = currentEmployees.map(employee => ({
        ...employee,
        latitude: (Math.random() * 140 - 70).toFixed(6),
        longitude: (Math.random() * 340 - 170).toFixed(6),
        timestamp: now.toISOString()
      }));
      
      setEmployees(updatedEmployees);
      
      if (selectedEmployee) {
        const updatedSelectedEmployee = updatedEmployees.find(
          emp => emp.id === selectedEmployee.id
        );
        if (updatedSelectedEmployee) {
          setSelectedEmployee(updatedSelectedEmployee);
        }
      }
      
      try {
        await API.post('/api/employees/random-locations');
      } catch (apiErr) {
        // Silent fail - local update already succeeded
      }
    } catch (err) {
      console.error('Error generating random locations:', err);
      setError('Failed to generate random locations. Please try again later.');
    }
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setIsDropdownOpen(false);
  };

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="map-page">
      <div className="map-page-header">
        <div className="actions">
          <button onClick={updateEmployeeLocations}>Update Locations</button>
          <button onClick={generateRandomLocations}>Generate Random Locations</button>
        </div>
      </div>

      <div className="map-content">
        <div className="map-container">
          <div className="map-title">Global Employee Locations</div>
          {loading ? (
            <div className="loading">Loading map data...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <MapChart 
                employees={employees} 
                selectedEmployee={selectedEmployee} 
                setSelectedEmployee={setSelectedEmployee}
                tooltip={tooltip}
                setTooltip={setTooltip}
              />
              <div className="map-legend">
                <div className="legend-item">
                  <span className="legend-marker employee"></span>
                  <span>Employees</span>
                </div>
                <div className="legend-item">
                  <span className="legend-marker selected"></span>
                  <span>Selected Employee</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="map-sidebar">
          <div className="employee-dropdown">
            <div className="dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <h2>Select Employee</h2>
              <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
            </div>
            
            {isDropdownOpen && (
              <div className="dropdown-content">
                <div className="search-container">
                  <input 
                    type="text" 
                    placeholder="Search employees..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <i className="fas fa-search search-icon"></i>
                </div>
                
                {loading ? (
                  <p className="dropdown-loading">Loading employees...</p>
                ) : filteredEmployees.length > 0 ? (
                  <ul className="dropdown-list">
                    {filteredEmployees.map((employee) => (
                      <li 
                        key={employee.id}
                        className={selectedEmployee?.id === employee.id ? 'selected' : ''}
                        onClick={() => handleEmployeeSelect(employee)}
                      >
                        <strong>{employee.name}</strong>
                        <p>{employee.position} - {employee.department}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-results">No employees found</p>
                )}
              </div>
            )}
          </div>

          <div className="employee-details">
            {selectedEmployee ? (
              <>
                <h2>{selectedEmployee.name}</h2>
                <div className="detail-card">
                  <div className="detail-row">
                    <span className="detail-label">Position:</span>
                    <span className="detail-value">{selectedEmployee.position}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{selectedEmployee.department}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Coordinates:</span>
                    <span className="detail-value">
                      {parseFloat(selectedEmployee.latitude).toFixed(4)}, {parseFloat(selectedEmployee.longitude).toFixed(4)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value live-update">{new Date(selectedEmployee.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <p>Select an employee to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;