import type { NextPage } from 'next'

import Publication from '../components/Publication/Publication'
import UserTitle from '../components/UserTitle/UsetTitle';
import Board from '../components/Board/Board';
import UserMiniTitle from '../components/UserMiniTitle/UserMiniTitle';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import ContentGrid from '../styles/components/ContentGrid';


const Home: NextPage = () => {
  return (
    <BaseLayout>
      <ContentGrid>
          <div>
            <Board>
                <UserMiniTitle />
                <UserMiniTitle />
                <UserMiniTitle />
            </Board>
            <Board>
                <UserMiniTitle />
                <UserMiniTitle />
                <UserMiniTitle />
            </Board>
          </div>

          <div>
            <Publication />
            <Publication />
            <Publication />
            <Publication />
          </div>

          <div>
            <Board>
                <UserMiniTitle />
                <UserMiniTitle />
                <UserMiniTitle />
            </Board>
          </div>
      </ContentGrid>
    </BaseLayout>
  )
}

export default Home
