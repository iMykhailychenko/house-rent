import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

const SinglePost = (): ReactElement => {
    const router = useRouter();

    return <div>{router.query.postId}</div>;
};

export default SinglePost;
