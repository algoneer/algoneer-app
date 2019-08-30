import React from 'react';
import RoundedInput from '../../../common/rounded-input/rounded-input.jsx';

const Search = () => {
    return (
        <form>
            <RoundedInput
                type="search"
                disabled
                placeholder="Search"
            />
        </form>
    );
};

export default Search;
