import React, { useState } from "react"
import { useRouter } from 'next/router';
import Link from "next/link";

import { AuthFormStyled, AuthLayoutStyled, FormTitle, SubmitStyled } from './style';
import { useLoginMutation } from "../../redux/api/authApi";
import { useAuth } from "../../providers/AuthProviders";
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/CheckBox';
import FlexStyled from '../../styles/components/Flex';
import Margin from '../../styles/components/Margin';

import BaveyLogo from "../../public/baveyLogo.svg"


const AuthLayout: React.FC = () => {
  const [login] = useLoginMutation();
  const authContext = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    login({username: username, password: password}).then((res:any) => {
      if (typeof res.data !== 'undefined') {
        authContext?.setAuthUser(res.data.token, 'SergeyAverin')
        router.push({
          pathname: '/profile',
        });
      }
    });
  };

  return (
    <AuthLayoutStyled>
      <BaveyLogo />
      <FormTitle>Sign in to Bevyes</FormTitle>
      <AuthFormStyled onSubmit={submitHandler}>
        <Margin mg='0 0 20px 0'>
          <Input attrName='username' labelText='Имя пользователя' inputValues={username} setInputValues={setUsername} />
        </Margin>
        <Margin mg='0 0 20px 0'>
          <Input attrName='password' labelText='Пароль' attrType='password' inputValues={password} setInputValues={setPassword} />
        </Margin>
        <FlexStyled justifyContent='space-between' alignItems='flex-start'>
          <div>
            <CheckBox text='Запомнить пароль' />
          </div>
          <div>
            <Margin mg='15px 0 0 0'>
              <Link href="#">Забыл пароль</Link>
            </Margin>
            <Margin mg='15px 0 0 0'>
              <Link href="#">Регистрация</Link>
            </Margin>
          </div>
        </FlexStyled>
        <SubmitStyled value='Sign in'/>
      </AuthFormStyled>
    </AuthLayoutStyled>
  )
};
  

export default AuthLayout;
