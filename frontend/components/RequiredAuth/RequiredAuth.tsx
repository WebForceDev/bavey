import React, { useEffect } from "react";
import { useRouter } from 'next/router';

import { useAuth } from "../../providers/AuthProviders";


interface IRequiredAuth {
    children: any
}

const RequiredAuth: React.FC<IRequiredAuth> = ({ children }) => {
    const router = useRouter();
    const authContext = useAuth();

    useEffect(()=>{
        console.log(authContext)
        if (authContext.token == null) {
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        }
    }, [])

    return (
        <>
            { children }
        </>
    )
}

export default RequiredAuth;
