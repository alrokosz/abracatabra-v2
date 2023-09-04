import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

type SearchBarProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ onChange, searchValue }: SearchBarProps) {
  return (
    <>
      <input value={searchValue} onChange={onChange}></input>
    </>
  );
}
