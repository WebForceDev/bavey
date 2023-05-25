import React, { useState } from "react";

import { DropDownSelectItemsStyled, DropDownSelectItemStyled, DropDownSelectTitleStyled } from "./styled";

import Arrow from "@public/arrow.svg";


interface IDropDownSelectProps {
    items: string[]
}

export const DropDownSelect:React.FC<IDropDownSelectProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeItem, setActiveItem] = useState(items[0]);

    const setActiveItemHandler:React.MouseEventHandler<HTMLElement> = (event) => {
        setIsOpen((prev) => !prev);
        const target = event.target as HTMLElement;
        setActiveItem(target.innerText);
    };
    
    return (
        <div>
            <DropDownSelectTitleStyled onClick={() => setIsOpen((prev) => !prev)}>
                <Arrow transform={isOpen ? "rotate(-90 0 0)" : "rotate(0 0 0)"} />
                { activeItem }
            </DropDownSelectTitleStyled>
            <DropDownSelectItemsStyled isOpen={isOpen}>
                <ul onClick={setActiveItemHandler}>
                    { items.map((item) => (<DropDownSelectItemStyled key={item}>{item}</DropDownSelectItemStyled>)) }
                </ul>
            </DropDownSelectItemsStyled>
        </div>
    )
};

