import type { NextPage } from 'next'

import WrapperStyled from '../styles/components/Wrapper';
import SettingsPanel from '../components/SettingsPanel/SettingsPanel';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import { useNavigation } from '../providers/NavigationProviders';
import Margin from '../styles/components/Margin';
import FlexStyled from '../styles/components/Flex';
import ButtonStyled from '../styles/components/Button';


const ProfilePage: NextPage = () => {
  const navigation = useNavigation();
  navigation?.setActivePage('Setting')

  return (
    <BaseLayout>
        <WrapperStyled>
            <Margin mg="100px 0 0 0">
                <FlexStyled alignItems='center' justifyContent='space-between'>
                    <ButtonStyled>Cancel</ButtonStyled>
                    <ButtonStyled fill={true}>Applay</ButtonStyled>
                </FlexStyled>
                <Margin mg="15px 0 0 0">
                    <SettingsPanel />
                </Margin>
            </Margin>
        </WrapperStyled>
    </BaseLayout>
  )
};

export default ProfilePage;
