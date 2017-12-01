import React from 'react';

const S_HEADER = {
  backgroundColor: '#2a2d33',
}

const S_TITLE = {
  padding: "10px 20px",
  color: '#fff',
  fontSize: '1.3em',
  margin: 0,
  fontWeight: "bold",
}

const S_SUBTITLE = {
  fontSize: "0.8em",
  fontWeight: 100,
}

function Header(props) {
  return (
    <div style={S_HEADER}>
      <h1 style={S_TITLE}>
        React Refactor - <span style={S_SUBTITLE}>Convert your React Class Component to Functional Component and vice-versa</span>
      </h1>
    </div>
  );
}

export default Header;
