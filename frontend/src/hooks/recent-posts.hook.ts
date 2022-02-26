import { useRouter } from 'next/router';

import { IRecentPost } from '../interfaces';
import { IPost } from '../state/entities/posts/posts.interface';
import { useProfileInfoSelector } from '../state/entities/profile/profile.selector';

import useAuth from './auth.hook';

const KEY = 'RECENT_POST';
const MAX_LENGTH = 8;
const DAY_IN_MS = 86_400_000;

interface RecentPostsStore {
    get(): IRecentPost[];
    set(value: unknown): void;
}

export const useRecentPosts = (): RecentPostsStore => {
    const router = useRouter();
    const postId = Number(router.query?.postId || '');

    const { token } = useAuth();
    const profileState = useProfileInfoSelector();

    return {
        get(): IRecentPost[] {
            try {
                const value = localStorage.getItem(KEY);

                if (!value) return [];

                const savedPosts = JSON.parse(value) as IRecentPost[];
                const notExpiredPosts = savedPosts.filter(item => Date.now() - item.date < DAY_IN_MS);

                if (savedPosts.length !== notExpiredPosts.length) {
                    localStorage.setItem(KEY, JSON.stringify(notExpiredPosts));
                }

                return notExpiredPosts
                    .filter(item => item.id !== postId && item.id)
                    .slice(0, MAX_LENGTH)
                    .sort((a, b) => b.date - a.date);
            } catch {
                return [];
            }
        },
        set(offer: IPost) {
            try {
                if (token?.accessToken && offer.user.id === profileState?.data?.id) return;

                const offers = this.get();
                const index = offers.findIndex(({ id }) => id === offer.id);

                if (index === -1) {
                    offers.unshift({
                        id: offer.id,
                        title: offer.title,
                        img: offer.image,
                        date: Date.now(),
                    });
                } else {
                    offers[index].date = Date.now();
                }

                localStorage.setItem(KEY, JSON.stringify(offers.slice(0, MAX_LENGTH + 2)));
            } catch (e) {
                console.log(e);
            }
        },
    };
};
