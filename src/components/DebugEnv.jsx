import React from 'react';

const DebugEnv = () => {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_AUTH_API_BASE_URL: process.env.REACT_APP_AUTH_API_BASE_URL,
    REACT_APP_DASHBOARD_API_BASE_URL: process.env.REACT_APP_DASHBOARD_API_BASE_URL,
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    REACT_APP_FORMATOS_API_URL: process.env.REACT_APP_FORMATOS_API_URL,
    REACT_APP_DEBUG_VARS: process.env.REACT_APP_DEBUG_VARS,
  };

  if (process.env.REACT_APP_DEBUG_VARS !== 'true') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <h4>Environment Variables:</h4>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value || 'undefined'}
        </div>
      ))}
    </div>
  );
};

export default DebugEnv;