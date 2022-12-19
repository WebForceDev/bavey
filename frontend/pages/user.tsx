import type { NextPage } from 'next'

import Publication from '../components/Publication/Publication'
import UserTitle from '../components/UserTitle/UsetTitle';
import Board from '../components/Board/Board';
import UserMiniTitle from '../components/UserMiniTitle/UserMiniTitle';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import ContentGrid from '../styles/components/ContentGrid';
import Margin from '../styles/components/Margin';


const Home: NextPage = () => {
  return (
    <BaseLayout>
      <Margin mg='59px 0 0 0'>
        <ContentGrid>
            <div>
              <Margin mg='0 0 15px 0'>
                <Board>
                    <UserMiniTitle />
                    <UserMiniTitle />
                    <UserMiniTitle />
                </Board>
              </Margin>
              <Board>
                  <UserMiniTitle />
                  <UserMiniTitle />
                  <UserMiniTitle />
              </Board>
            </div>

            <div>
                <Margin mg='0 0 30px 0'>
                  <Publication />
                </Margin>
                <Margin mg='0 0 30px 0'>
                  <Publication />
                </Margin>
              
            </div>

            <div>
              <Board>
                  <UserMiniTitle />
                  <UserMiniTitle />
                  <UserMiniTitle />
              </Board>
            </div>
        </ContentGrid>
      </Margin>
    </BaseLayout>
  )
}

export default Home
