import React, { useState } from "react";
import { useRouter } from "next/router";

import { SearchInput } from "@features/search/ui/styled";

import SearchIcon from '@public/searchIcon.svg';


export const Search = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');

    const onChangeHeandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const onBlur = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue('');
        setIsActive(false);
    }

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        router.push(`/search/user?search=${value}`)
    }

    return (
        <form onSubmit={onSubmit}>
            {!isActive && <SearchIcon onClick={() => setIsActive(true)} alt='search' />}
            {isActive && <SearchInput value={value} onBlur={onBlur} onChange={onChangeHeandler} />}
        </form>
    );
}
