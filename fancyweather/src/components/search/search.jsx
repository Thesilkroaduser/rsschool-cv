import React, { useRef } from 'react';
import './search_area.scss';
import PropTypes from 'prop-types';

const Search = (props) => {
  const { handler, isRussian } = props;
  const input = useRef();
  return (
    <form
      className="search"
      onSubmit={(e) => {
        handler(e, input.current.value);
        input.current.value = '';
      }}
    >
      <input className="input-area" type="text" ref={input} />
      <button type="submit" className="submit">
        {isRussian ? 'Поиск' : 'Search'}
      </button>
    </form>
  );
};

Search.propTypes = {
  handler: PropTypes.func.isRequired,
  isRussian: PropTypes.bool.isRequired,
};

export default Search;
