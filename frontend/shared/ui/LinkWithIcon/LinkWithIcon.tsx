import React from "react";
import Link from "next/link";

import { LinkWithIconStyled, LinkWithIconTextStyled } from "./styled";


interface ILinkWithIconProps {
    href: string,
    text: string|null|undefined,
    icon: any,
    isActive: boolean,
}

export const LinkWithIcon: React.FC<ILinkWithIconProps> = ({ href, icon, text, isActive }) => {
    return (
        <Link href={href}>
            <LinkWithIconStyled isActive={isActive}>
                { icon }
                <LinkWithIconTextStyled>
                    { text }
                </LinkWithIconTextStyled>
            </LinkWithIconStyled>
        </Link>
    )
};
