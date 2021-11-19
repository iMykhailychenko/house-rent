import React from 'react';

import Button from '../../../../button/button';
import StickyModal from '../../../components/sticky-modal/sticky-modal';
import { modal } from '../../../modal';
import css from '../change-user-role.module.scss';

interface IProps {
    onSubmit: () => Promise<void>;
    loading: boolean;
}

const ConfirmDeleteUserRole = ({ onSubmit, loading }: IProps): JSX.Element => {
    return (
        <StickyModal
            title="Змінити роль"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary className={css.primary} onClick={onSubmit} loading={loading}>
                        Змінити
                    </Button>
                </>
            }
        >
            <div>
                <h3 className={css.title}>Ви впевнені що бажаєте змінити роль користувача на сайті на неактивну?</h3>
                <p className={css.warn}>
                    Після цього всі ваші активні оголошення попадуть до архіву. Ви зможете відновити їх після того як повернете
                    собі роль користувача
                </p>
            </div>
        </StickyModal>
    );
};

const confirmDeleteUserRole = (props: IProps): void => {
    modal.open(<ConfirmDeleteUserRole loading={props.loading} onSubmit={props.onSubmit} />);
};

export default confirmDeleteUserRole;
