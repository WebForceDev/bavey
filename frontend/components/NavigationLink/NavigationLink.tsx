import React from "react";
import Image from "next/image";
import Link from "next/link";

import { NavigationLinkStyled, NavigationLinkTextStyled } from "./style";


interface INavigationLinkProps {
    href: string,
    text: string,
    icon: any,
    alt: any,
}

const NavigationLink: React.FC<INavigationLinkProps> = ({ href, icon, alt, text }) => {
    return (
        <Link href={href}>
            <NavigationLinkStyled>
                <Image src={icon} alt={alt} />
                <NavigationLinkTextStyled>
                    { text }
                </NavigationLinkTextStyled>
            </NavigationLinkStyled>
        </Link>
    )
};

export default NavigationLink;
