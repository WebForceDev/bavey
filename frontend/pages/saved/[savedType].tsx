import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useNavigation } from '../../providers/NavigationProviders';
import TwoColumnLayout from '../../components/TwoColumnLayout/TwoColumnLayout';


const SavedPublicationPage: NextPage = () => {
  //const { data, isLoading } = useFriendRequestsQuery();
  const router = useRouter();
  const { savedType } = router.query;
  const navigationContext = useNavigation();
  navigationContext?.setActivePage('Saved post')
  const isLoading = false;

  return (
    <TwoColumnLayout>
        <div>
        {isLoading ? 'Loading' : 
          <>
            <div id="inside">
              { 'inside' }
            </div>
            <div id="outside">
              { 'outside' }
            </div>
          </>
        }
        </div>
        <div>
          <Link href="/saved/upvoice">Up voice</Link>
          <Link href="/saved/downvoice">Down voice</Link>
          <Link href="/saved/saved">Saved</Link>
        </div>
    </TwoColumnLayout>
  )
}

export default SavedPublicationPage;
