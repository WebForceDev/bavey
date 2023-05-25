import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ICommunity } from "../model/types";
import { SubscriptionStyled, SubscriptionTitleStyled } from "./styled";
import { Flex, Button } from "@shared/ui";


import Avatar from "@public/Avatar.png";


interface ISubscriptionProps {
    community: ICommunity
}

export const Subscription: React.FC<ISubscriptionProps> = ({ community }) => {
    return (
        <SubscriptionStyled>
            <Flex justifyContent="flex-start" alignItems="center">
                <Image src={Avatar} alt={community.title} width={80} height={80} />
                <Link href='#'>
                    <SubscriptionTitleStyled>
                        { community.title }
                    </SubscriptionTitleStyled>
                </Link>
            </Flex>

            <Button>
                unsubscribe
            </Button>
        </SubscriptionStyled>
    )
}