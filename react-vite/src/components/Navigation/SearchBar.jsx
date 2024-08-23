import { useState } from "react";

import { IoSearch } from "react-icons/io5";
import "./SearchBar.css";

function SearchBar() {
  const [tagsDropDown, setTagsDropDown] = useState(false);

  return (
    <>
      <div id="search-main-container">
        <div id='search-bar'>
        <input
          onClick={() => setTagsDropDown(!tagsDropDown)}
          placeholder="Search"
        ></input>
        <IoSearch />

        </div>
      </div>
    </>
  );
}

export default SearchBar;
