import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';

import { Margin } from '@shared/ui';
import { Publication } from '@entities/publication';
import { useGetPublicationListQuery, UserMini } from '@entities/User';
import { IPublication } from '@entities/publication';
import { SetVoiceButton } from '@features/SetVoicesButton';
import { useGetSavedPublicationListQuery } from '../api/savedPublicationListApi';

import DownVoiceIcon from '@public/downVoiceIcon.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';
import UpVoiceIcon from '@public/upVoiceIcon.svg';

interface ISavedPublicationListProps {
    savedType: string
}

export const SavedPublicationList: React.FC<ISavedPublicationListProps> = ({savedType}) => {
    const pulicationListQuery = useGetSavedPublicationListQuery();
    let publications =  pulicationListQuery.data ?? [];
    if (pulicationListQuery.data) {
        switch (savedType) {
            case 'up':
                publications = publications?.saved_voices_up;
                break;
            case 'down':
                publications = publications?.saved_voices_down;
                break;
            case 'bookmark':
                publications = publications?.saved_bookmarks;
                break;
        }
    }

    const theme = useContext(ThemeContext)

    return (
        <div>  
            { publications.map((publication) => (
                <Margin mb={30}  key={publication.publication.slug}>
                    <Publication
                        publicationHeader={<UserMini user={publication.owner} />}
                        publication={publication} 
                        upVoiceButtonSlot={<SetVoiceButton
                            publicationSlug={publication.publication.slug}
                            voiceType='voices_up'
                            iconDisable={<UpVoiceIcon fill={theme.color.white} />}
                            iconEnable={<UpVoiceIcon fill={theme.color.grean} />}
                            isEnableProps={false}
                            voiceCount={publication.voices_up.length}
                        />}
                        downVoiceButtonSlot={<SetVoiceButton
                            publicationSlug={publication.publication.slug}
                            isEnableProps={false}
                            voiceType='voices_down'
                            iconDisable={<DownVoiceIcon fill={theme.color.white} />}
                            iconEnable={<DownVoiceIcon fill={theme.color.grean} />}
                            voiceCount={publication.voices_down.length}
                        />}
                        bookmarkVoiceButtonSlot={<SetVoiceButton
                            publicationSlug={publication.publication.slug}
                            isEnableProps={false}
                            voiceType='bookmarks'
                            iconDisable={<BookmarkIcon fill={theme.color.white} />}
                            iconEnable={<BookmarkIcon fill={theme.color.grean} />}
                            
                        />}
                    />
                </Margin>
            ))}
        </div>
    )
}
