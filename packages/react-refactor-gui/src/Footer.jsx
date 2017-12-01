import React from 'react';

const S_FOOTER = {
  display: 'flex',
  justifyContent: "space-around",

  background: '#efefef',
  borderTop: "1px solid #ddd",
  fontSize: '0.9em',
  padding: 2,
  color: "#555",
  height: 25,
  textAlign: 'center',
}

function Footer(props) {
  return (
    <div style={S_FOOTER}>
      <div>
        Made with <span style={{color: '#ff5252'}}>&#10084;</span> by <a
        href="https://github.com/chrvadala">chrvadala</a>
      </div>

      <div>Install CLI tool <span style={{fontFamily: 'courier'}}>npm i react-refactor -g</span></div>
    </div>
  );
}

Footer.propTypes = {};
Footer.defaultProps = {};


export default Footer;
