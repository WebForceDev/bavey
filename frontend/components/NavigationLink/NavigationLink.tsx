import React from "react";
import Link from "next/link";

import { NavigationLinkStyled, NavigationLinkTextStyled } from "./style";


interface INavigationLinkProps {
    href: string,
    text: string|null|undefined,
    icon: any,
}

const NavigationLink: React.FC<INavigationLinkProps> = ({ href, icon, text }) => {
    return (
        <Link href={href}>
            <NavigationLinkStyled>
                { icon }
                <NavigationLinkTextStyled>
                    { text }
                </NavigationLinkTextStyled>
            </NavigationLinkStyled>
        </Link>
    )
};

export default NavigationLink;
