import React from 'react';
import './bg.scss';
import PropTypes from 'prop-types';

const Bg = (props) => {
  const { isFaded, src } = props;
  return <img id="wallpaper" alt="nature" className={`bg${isFaded ? ' faded' : ''}`} src={src} />;
};

Bg.propTypes = {
  src: PropTypes.string.isRequired,
  isFaded: PropTypes.bool.isRequired,
};

export default Bg;
