import React from 'react';

const S_INTRODUCTION = {
  margin: "10px 20px",
}

const S_DESC = {
  margin: 0,
  fontSize: "0.9em",
  fontWeight: 100,
}

function Introduction(props) {
  return (
    <div style={S_INTRODUCTION}>
      <p style={S_DESC}>
        How many times have you converted a <strong>React Class component</strong> to a <strong>React Functional component</strong> and vice-versa? It’s a boring task, and we know...  "<em>developers don’t like boring tasks</em>".<br/>
        Thanks to <strong>React Refactor</strong> you can convert any React component from and to Class component. <br/><br/>
        <strong>Paste your code into left panel</strong>
      </p>
    </div>
  );
}

Introduction.propTypes = {};
Introduction.defaultProps = {};


export default Introduction;
