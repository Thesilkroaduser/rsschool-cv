import React from 'react';

const Search = (data) => {
  const { handler } = data.handler;
  return (
    <div className="search">
      <input className="input-area" type="text" />
      <button onClick={handler} type="button" className="submit">
        SEARCH
      </button>
    </div>
  );
};
export default Search;
