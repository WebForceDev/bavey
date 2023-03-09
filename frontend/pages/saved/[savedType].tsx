import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
        </div>

        <NavigationSideBar>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Saved up' href='/saved/up' alt='up' icon={UpVoiceIcon} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Saved down' href='/saved/down' alt='down' icon={DownVoiceIcon} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Bookmark' href='/saved/bookmark' alt='bookmark' icon={BookmarkVoiceIcon} />
          </Margin>
        </NavigationSideBar>

    </TwoColumnLayout>
  )
}

export default SavedPublicationPage;
