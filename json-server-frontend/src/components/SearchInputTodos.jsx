import React from 'react';

const SearchInput = ({ search, setSearch }) => {
    return (
      <input
        className='search-input'
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  };

export default SearchInput;
  