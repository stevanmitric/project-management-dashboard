import { Input } from 'antd';
import { useState } from 'react';

export default function SearchBar({ handleSearch, page }) {
  const [term, setTerm] = useState('');

  const { Search } = Input;

  const handleChange = event => {
    setTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <Search
      className={`${page === `project` ? `ml-3 mb-4 max-w-[300px]` : ''}`}
      placeholder='Search'
      onChange={handleChange}
      value={term}
    />
  );
}
