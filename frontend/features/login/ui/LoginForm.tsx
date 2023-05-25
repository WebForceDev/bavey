import React, { useState } from "react"
import { useRouter } from 'next/router';
import Link from "next/link";

import { AuthFormStyled, AuthLayoutStyled, FormTitle, SubmitStyled } from './styled';
import { Margin, Flex, Input } from '@shared/ui';
import { useLoginMutation, useViewer } from "@entities/viewer";

import BaveyLogo from "@public/baveyLogo.svg"


export const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const viewerContext = useViewer();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    login({username: username, password: password}).then((res:any) => {
      if (typeof res.data !== 'undefined') {
        viewerContext?.setAuthViewer(res.data)
        router.push({
          pathname: `/user/${res.data.user.username}`,
        });
      }
    });
  };

  return (
    <AuthLayoutStyled>
      <BaveyLogo />
      <FormTitle>Sign in to Bevyes</FormTitle>
      <AuthFormStyled onSubmit={submitHandler}>
        <Margin mb={15}>
          <Input attrName='username' labelText='Имя пользователя' inputValues={username} setInputValues={setUsername} />
        </Margin>
        <Margin mb={15}>
          <Input attrName='password' labelText='Пароль' attrType='password' inputValues={password} setInputValues={setPassword} />
        </Margin>
        <Flex justifyContent='space-between' alignItems='flex-start'>
          <div>
            <Margin mt={15}>
              <Link href="#">Забыл пароль</Link>
            </Margin>
            <Margin mt={15}>
              <Link href="#">Регистрация</Link>
            </Margin>
          </div>
        </Flex>
        <SubmitStyled value='Sign in'/>
      </AuthFormStyled>
    </AuthLayoutStyled>
  )
};
