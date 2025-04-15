import React from "react";

export default function SearchBar({ searchQuery, handleSearchChange, placeholder}) {

    return (
        <input
            type="text"
            data-testid="search-bar"
            className="search-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
        />
    )
}