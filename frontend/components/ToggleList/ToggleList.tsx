import React, { useState } from "react";

import { ToggleListItemsStyled, ToggleListItemStyled, ToggleListTitleStyled } from "./styled";

import Arrow from "../../public/arrow.svg";


interface IToggleListProps {
    items: string[]
}

const ToggleList:React.FC<IToggleListProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeItem, setActiveItem] = useState(items[0]);

    const setActiveItemHandler:React.MouseEventHandler<HTMLElement> = (event) => {
        setIsOpen((prev) => !prev);
        setActiveItem(event.target.innerText);
    };

    return (
        <div>
            <ToggleListTitleStyled onClick={() => setIsOpen((prev) => !prev)}>
                <Arrow transform={isOpen ? "rotate(-90 0 0)" : "rotate(0 0 0)"} />
                { activeItem }
            </ToggleListTitleStyled>
            <ToggleListItemsStyled isOpen={isOpen}>
                <ul onClick={setActiveItemHandler}>
                    { items.map((item) => (<ToggleListItemStyled key={item}>{item}</ToggleListItemStyled>)) }
                </ul>
            </ToggleListItemsStyled>
        </div>
    )
};

export default ToggleList;
