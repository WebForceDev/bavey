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
        console.log('context ')
        if (authContext?.token == '') {
            router.push({
                pathname: '/login',
            });
        }
        console.log(authContext?.token)
    }, [])

    return (
        <>
            { children }
        </>
    )
}

export default RequiredAuth;
