import React from 'react';

const Search = (data) => {
  const { handler, language } = data;
  return (
    <div className="search">
      <input onKeyDown={handler} className="input-area" type="text" />
      <button onClick={handler} type="button" className="submit">
        {language ? 'Поиск' : 'Search'}
      </button>
    </div>
  );
};
export default Search;
