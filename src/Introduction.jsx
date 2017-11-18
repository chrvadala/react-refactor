import React from 'react';

const S_INTRODUCTION = {
  margin: "10px 20px",
}

const S_DESC = {
  margin: 0,
  fontSize: "0.9em",
}

function Introduction(props) {
  return (
    <div style={S_INTRODUCTION}>
      <p style={S_DESC}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
        make
        a type specimen book.
      </p>
    </div>
  );
}

Introduction.propTypes = {};
Introduction.defaultProps = {};


export default Introduction;
