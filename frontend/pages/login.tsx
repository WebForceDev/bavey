import type { NextPage } from 'next'
import Link from 'next/link'

import Input from '../components/Input/Input'
import CheckBox from '../components/CheckBox/CheckBox'
import FlexStyled from '../styles/components/Flex'
import Margin from '../styles/components/Margin'
import AuthLayout from '../components/AuthLayout/AuthLayout'


const LoginPage: NextPage = () => {
  return (
    <AuthLayout>
      <Margin mg='0 0 20px 0'>
        <Input attrName='username' labelText='Имя пользователя' />
      </Margin>
      <Margin mg='0 0 20px 0'>
        <Input attrName='password' labelText='Пароль' attrType='password' />
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
    </AuthLayout>
  )
}

export default LoginPage;
