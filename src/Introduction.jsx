import React from 'react';

const S_DESCRIPTION = {
  margin: '20px 30px',
}

function Introduction(props) {
  return (
    <p style={S_DESCRIPTION}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      make
      a type specimen book.
    </p>
  );
}

Introduction.propTypes = {};
Introduction.defaultProps = {};


export default Introduction;
