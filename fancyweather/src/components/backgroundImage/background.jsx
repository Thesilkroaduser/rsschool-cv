import React from 'react';
import PropTypes from 'prop-types';

const Bg = (props) => {
  const { src, className } = props;
  return <img id="wallpaper" alt="nature" className={className} src={src} />;
};

Bg.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Bg;
