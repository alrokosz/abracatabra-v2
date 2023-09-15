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
      <input
        style={{
          width: '100%'
        }}
        value={searchValue}
        onChange={onChange}
      ></input>
    </>
  );
}
/* 
    background-image: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --%3E%3Cpath d='M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z'/%3E%3C/svg%3E") no-repeat 13px center;
    background-position: 10px center;
*/
