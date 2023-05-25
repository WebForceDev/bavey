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
        if (authContext?.token == '') {
            router.push({
                pathname: '/login',
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
