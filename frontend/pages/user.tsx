import type { NextPage } from 'next'

import Publication from '../components/Publication/Publication';
import Board from '../components/Board/Board';
import UserMiniTitle from '../components/UserMiniTitle/UserMiniTitle';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import ContentGrid from '../styles/components/ContentGrid';
import Margin from '../styles/components/Margin';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import WrapperStyled from "../styles/components/Wrapper"


const Home: NextPage = () => {
  return (
    <BaseLayout>
      <ProfileHeader />
      <WrapperStyled>
        <Margin mg='59px 0 0 0'>
          <ContentGrid>
              <div>
                <Margin mg='0 0 15px 0'>
                  <Board>
                    <Margin mg='8px 0 0 0'>
                      <UserMiniTitle />
                    </Margin>
                    <Margin mg='8px 0 0 0'>
                      <UserMiniTitle />
                    </Margin>
                    <Margin mg='8px 0 0 0'>
                      <UserMiniTitle />
                    </Margin>
                  </Board>
                </Margin>
                <Board>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle />
                  </Margin>
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
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle />
                  </Margin>
                </Board>
              </div>
          </ContentGrid>
        </Margin>
      </WrapperStyled>
    </BaseLayout>
  )
}

export default Home
