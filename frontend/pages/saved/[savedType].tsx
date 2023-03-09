import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useNavigation } from '../../providers/NavigationProviders';
import TwoColumnLayout from '../../components/TwoColumnLayout/TwoColumnLayout';
import { useSavedPublicationQuery } from '../../redux/api/postApi';
import Publication from '../../components/Publication/Publication';


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
        <div>
          <Link href="/saved/up">Up voice</Link>
          <Link href="/saved/down">Down voice</Link>
          <Link href="/saved/bookmark">Bookmark</Link>
        </div>
    </TwoColumnLayout>
  )
}

export default SavedPublicationPage;
