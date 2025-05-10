import React, { memo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Annotation
} from "react-simple-maps";

// This is a more reliable source for the world map data
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ employees = [], selectedEmployee, setSelectedEmployee, tooltip, setTooltip }) => {
  console.log('MapChart rendering with', employees.length, 'employees');
  // State to track the last update time
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [pulseMarkers, setPulseMarkers] = useState({});
  
  // Update the last update time whenever employees data changes
  useEffect(() => {
    console.log('Employees updated in MapChart:', employees.length);
    setLastUpdate(new Date());
    
    // Create a pulse effect for markers that have moved
    const newPulseMarkers = {};
    employees.forEach(employee => {
      newPulseMarkers[employee.id] = true;
    });
    
    setPulseMarkers(newPulseMarkers);
    
    // Remove pulse effect after 500ms
    const timer = setTimeout(() => {
      setPulseMarkers({});
    }, 500);
    
    return () => clearTimeout(timer);
  }, [employees]);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className="live-indicator">
        <span className="live-dot"></span>
        <span>LIVE</span>
        <span className="update-time">{lastUpdate.toLocaleTimeString()}</span>
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
        }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#2a5674" // Ocean blue background
        }}
      >
        <rect
          x={-16000}
          y={-16000}
          width={32000}
          height={32000}
          fill="#2a5674" // Ocean blue background
        />
        <ZoomableGroup center={[0, 20]} zoom={1} maxZoom={5} minZoom={0.5}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#d1d1d1"
                stroke="#FFF"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#F5F5F5", outline: "none" },
                  pressed: { outline: "none" }
                }}
              />
            ))
          }
        </Geographies>
        
        {/* Display employee markers */}
        {employees.map((employee) => (
          <Marker
            key={employee.id}
            coordinates={[parseFloat(employee.longitude), parseFloat(employee.latitude)]}
            onClick={() => setSelectedEmployee(employee)}
            onMouseEnter={() => {
              setTooltip({
                employee,
                coordinates: [parseFloat(employee.longitude), parseFloat(employee.latitude)]
              });
            }}
            onMouseLeave={() => {
              setTooltip(null);
            }}
          >
            {/* Pulse effect for moving markers */}
            {pulseMarkers[employee.id] && (
              <circle
                r={12}
                fill="rgba(255, 140, 0, 0.3)"
                stroke="rgba(255, 140, 0, 0.5)"
                strokeWidth={1}
                style={{
                  animation: "pulse 1s ease-out"
                }}
              />
            )}
            <circle
              r={6}
              fill={selectedEmployee?.id === employee.id ? "#FF8C00" : "#F00"}
              stroke="#FFF"
              strokeWidth={2}
            />
          </Marker>
        ))}
        
        {/* Display selected employee annotation */}
        {selectedEmployee && (
          <Annotation
            subject={[parseFloat(selectedEmployee.longitude), parseFloat(selectedEmployee.latitude)]}
            dx={-30}
            dy={-30}
            connectorProps={{
              stroke: "#FF8C00",
              strokeWidth: 2,
              strokeLinecap: "round"
            }}
          >
            <text
              x={4}
              y={-4}
              fill="#FF8C00"
              textAnchor="end"
              alignmentBaseline="middle"
              style={{ 
                fontFamily: "system-ui", 
                fontSize: "12px",
                fontWeight: "bold",
                textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
                pointerEvents: "none"
              }}
            >
              {selectedEmployee.name}
            </text>
          </Annotation>
        )}
        
        {/* Display tooltip */}
        {tooltip && (
          <Marker coordinates={tooltip.coordinates}>
            <foreignObject
              x={-90}
              y={-90}
              width={180}
              height={90}
              style={{ overflow: "visible" }}
            >
              <div className="marker-tooltip">
                <div className="tooltip-name">{tooltip.employee.name}</div>
                <div className="tooltip-coordinates">
                  {parseFloat(tooltip.employee.latitude).toFixed(4)}, {parseFloat(tooltip.employee.longitude).toFixed(4)}
                </div>
                <div className="tooltip-update">
                  Updated: {new Date(tooltip.employee.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </foreignObject>
          </Marker>
        )}
      </ZoomableGroup>
    </ComposableMap>
    </div>
  );
};

// Use React.memo with a custom comparison function to ensure updates only happen when necessary
export default memo(MapChart, (prevProps, nextProps) => {
  // Always re-render if the employees array changes
  if (prevProps.employees !== nextProps.employees) {
    return false;
  }
  
  // Always re-render if the selected employee changes
  if (prevProps.selectedEmployee !== nextProps.selectedEmployee) {
    return false;
  }
  
  // Always re-render if the tooltip changes
  if (prevProps.tooltip !== nextProps.tooltip) {
    return false;
  }
  
  // Otherwise, don't re-render
  return true;
});