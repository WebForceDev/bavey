import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';

import { Margin } from '@shared/ui';
import { Publication } from '@entities/publication';
import { useGetPublicationListQuery, UserMini } from '@entities/User';
import { IPublication } from '@entities/publication';
import { SetVoiceButton } from '@features/SetVoicesButton';

import DownVoiceIcon from '@public/downVoiceIcon.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';
import UpVoiceIcon from '@public/upVoiceIcon.svg';


interface IPublicationList {
    publicationsFromServerRender: IPublication[]
}

export const PublicationList: React.FC<IPublicationList> = ({ publicationsFromServerRender }) => {
    const router = useRouter();
    const username = router.query.username;
    const [page, setPage] = useState(1);
    const pulicationListQuery = useGetPublicationListQuery({username: username, offset: page+1, limit: 5});
    const publications = pulicationListQuery.data ?? publicationsFromServerRender;
    const theme = useContext(ThemeContext)

    useEffect(() => {
        const onScroll = () => {
        const scrolledToBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (scrolledToBottom && !pulicationListQuery.isFetching) {
            setPage(page + 1);
        }
        };

        document.addEventListener("scroll", onScroll);

        return function () {
        document.removeEventListener("scroll", onScroll);
        };
    }, [page, pulicationListQuery.isFetching]);
    console.log(publications)
    
    return (
        <>
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
        </>
    )
}
