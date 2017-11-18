import React from 'react';

const S_HEADER = {
  display: 'block',
  padding: '40px 30px',
  width: '100%',

  backgroundColor: '#2a2d33',
  color: '#fff',
  fontSize: '2.1em',
  margin: 0,
  fontWeight: 100,
}

const S_SUBTITLE = {
  color: '#b8b8bc',
  fontSize: '0.6em',
  paddingLeft: '0.7em',
}

function Header(props) {
  return (
    <h1 style={S_HEADER}>
      React Refactor
      <span style={S_SUBTITLE}>Convert ...</span>
    </h1>
  );
}

export default Header;
