import React, { useState, useEffect } from "react";

import { SettingsPanelStyled, SettingsNavigationStyled, SettingsNavigationLinksStyled, SettingsNavigationLink, SettingsInput, SettingsLabel, SettingsTextarea } from './styled';
import SettingsPage from "../SettingPage/SettingPage";
import { useProfileQuery } from "../../redux/api/userApi";


const SettingsPanel: React.FC = () => {
    const [activePage, setActivePage] = useState('base');

    const [userSetting, setUserSetting] = useState({
        username: '',
        firstname: '',
        lastname: '',
        discription: '',
        country: '',
        city: '',
    });

    const {data, isLoading} = useProfileQuery();

    useEffect(()=>{
        if (!isLoading) {
            setUserSetting({
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                discription: data.discription,
                country: '',
                city: '',
            })
        }
    }, [isLoading])

    return (
        <SettingsPanelStyled>
            <SettingsNavigationStyled>
                <SettingsNavigationLinksStyled>
                    <SettingsNavigationLink
                        isActive={activePage=='base'}
                        onClick={() => setActivePage('base')}>Base</SettingsNavigationLink>
                    <SettingsNavigationLink
                        isActive={activePage=='photo'}
                        onClick={() => setActivePage('photo')}>Photo</SettingsNavigationLink>
                </SettingsNavigationLinksStyled>
            </SettingsNavigationStyled>
            { activePage == 'base' && !isLoading &&
                <SettingsPage>
                    <SettingsLabel>Username</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, username:event.target.value})}
                        value={userSetting.username} />
                    <SettingsLabel>First name</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, firstname:event.target.value})}
                        value={userSetting.firstname} />
                    <SettingsLabel>Last name</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, lastname:event.target.value})}
                        value={userSetting.lastname} />
                    <SettingsLabel>Discription</SettingsLabel>
                    <SettingsTextarea
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, discription:event.target.value})}
                        value={userSetting.discription}></SettingsTextarea>
                    <SettingsLabel>Cauntry</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, country:event.target.value})}
                        value={userSetting.country} />
                    <SettingsLabel>City</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, city:event.target.value})}
                        value={userSetting.city} />
                </SettingsPage>
            }
            { activePage == 'photo' &&
                <SettingsPage>
                    Photo
                </SettingsPage>
            }
        </SettingsPanelStyled>
    )
}

export default SettingsPanel;
