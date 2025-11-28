// src/components/Charts/ValuationLeafletMap.jsx
import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const ValuationMap = ({ data }) => {
  // Determine max valuation for marker sizing
  const maxValuation = Math.max(...data.map(d => d.valuations));
  
  const getRadius = (val) => (val / maxValuation) * 50 + 5; // scale radius

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Center of India
      zoom={5}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {data.map((d, idx) => (
        <CircleMarker
          key={idx}
          center={[d.lat, d.lng]}
          radius={getRadius(d.valuations)}
          fillColor="#1d3557"
          color="#a8dadc"
          fillOpacity={0.7}
          stroke={true}
        >
          <Popup>
            <strong>{d.state}</strong>
            <br />
            Valuations: {d.valuations}
            <br />
            Avg Loan: ₹{d.avgLoan.toLocaleString()}
            <br />
            Top Property: {d.topProperty}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default ValuationMap;
