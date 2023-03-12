import type { NextPage } from 'next'
import { useState, useEffect } from 'react';

import WrapperStyled from '../styles/components/Wrapper';
import SettingsPanel from '../components/SettingsPanel/SettingsPanel';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import { useNavigation } from '../providers/NavigationProviders';
import Margin from '../styles/components/Margin';
import FlexStyled from '../styles/components/Flex';
import ButtonStyled from '../styles/components/Button';
import { useProfileQuery, useUpdateUserMutation } from '../redux/api/userApi';
import { SubmitStyled } from '../styles/components/Submit';



const ProfilePage: NextPage = () => {
    const [updateUser] = useUpdateUserMutation();
    const [userSetting, setUserSetting] = useState({
        username: '',
        first_name: '',
        last_name: '',
        description: '',
        country: '',
        city: '',
    });
    const {data, isLoading} = useProfileQuery();

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        updateUser(userSetting);
      };

    useEffect(()=>{
        if (!isLoading) {
            setUserSetting({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                description: data.description,
                country: data.country,
                city: data.city,
            })
        }
    }, [isLoading])

    const navigation = useNavigation();
    navigation?.setActivePage('Setting')

    return (
        <BaseLayout>
            <WrapperStyled>
                <form onSubmit={submitHandler}>
                    <Margin mg="100px 0 0 0">
                        <FlexStyled alignItems='center' justifyContent='space-between'>
                            <ButtonStyled>Cancel</ButtonStyled>
                            <SubmitStyled value="Applay" /> 
                        </FlexStyled>
                        <Margin mg="15px 0 0 0">
                            {!isLoading &&
                                <SettingsPanel userSetting={ userSetting } setUserSetting={ setUserSetting } />                            
                            }
                        </Margin>
                    </Margin>
                </form>
            </WrapperStyled>
        </BaseLayout>
    )
};

export default ProfilePage;
