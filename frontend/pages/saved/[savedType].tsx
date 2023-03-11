import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';
import { useContext } from "react";

import { useNavigation } from '../../providers/NavigationProviders';
import TwoColumnLayout from '../../components/TwoColumnLayout/TwoColumnLayout';
import { useSavedPublicationQuery } from '../../redux/api/postApi';
import Publication from '../../components/Publication/Publication';
import NavigationSideBar from '../../components/NavigationSideBar/NavigationSideBar';
import Margin from '../../styles/components/Margin';
import NavigationLink from '../../components/NavigationLink/NavigationLink';

import DownVoiceIcon from '../../public/downVoiceIcon.svg';
import UpVoiceIcon from '../../public/upVoiceIcon.svg';
import BookmarkVoiceIcon from '../../public/bookmarkIcon.svg';


const SavedPublicationPage: NextPage = () => {
  const theme = useContext(ThemeContext);
  const navigationContext = useNavigation();
  navigationContext?.setActivePage('Saved post')

  const router = useRouter();
  const { savedType } = router.query;
  const { data, isLoading } = useSavedPublicationQuery({type_voice: savedType});

  return (
    <TwoColumnLayout>
        <div>
        {isLoading ? 'Loading' : 
          <>
            {
              data?.publications.map((publication) => (
                <Publication
                  user={publication.autor}
                  publication={publication}
                  key={publication.slug} />
              ))
            }
          </>
        }
        {
          data?.publications.length == 0 && !isLoading &&
          <h2>No saved publication</h2>
        }
        </div>

        <NavigationSideBar>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Saved up' href='/saved/up' icon={<UpVoiceIcon fill={theme.color.white} />} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Saved down' href='/saved/down' icon={<DownVoiceIcon fill={theme.color.white} />} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Bookmark' href='/saved/bookmark' icon={<BookmarkVoiceIcon fill={theme.color.white} />} />
          </Margin>
        </NavigationSideBar>

    </TwoColumnLayout>
  )
}

export default SavedPublicationPage;
