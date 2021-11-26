import React from 'react';

import TextSkeleton from '../../../../common/skeletons/text-skeleton/text-skeleton';
import FormSeparator from '../../new/new-post-form/form-separator/form-separator';

import css from './edit-post-skeleton.module.scss';

const EditPostSkeleton = (): JSX.Element => (
    <>
        <FormSeparator />

        <div className={css.root}>
            <div className={css.label}>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.inner}>
                <TextSkeleton amount={4} />
            </div>
        </div>

        <div className={css.root}>
            <div className={css.label}>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.inner}>
                <TextSkeleton amount={8} />
            </div>
        </div>

        <FormSeparator />

        <div className={css.root}>
            <div className={css.label}>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.inner}>
                <TextSkeleton amount={4} />
            </div>
        </div>

        <div className={css.root}>
            <div className={css.label}>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.inner}>
                <TextSkeleton amount={6} />
            </div>
        </div>

        <div className={css.root}>
            <div className={css.label}>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.inner}>
                <TextSkeleton amount={6} />
            </div>
        </div>

        <FormSeparator />
    </>
);

export default EditPostSkeleton;
