import React, { ReactElement } from 'react';

import MiddleModalWrp from '../../../../../common/modal/middle-modal-wrp/middle-modal-wrp';
import { modal } from '../../../../../common/modal/modal';

import css from './form-template-modal.module.scss';

interface IProps {
    title?: string;
    list: string[];
    onChange: (index: number) => void;
}

const FormTemplateModal = ({ title, list, onChange }: IProps): ReactElement => {
    const handleChange = (index: number) => () => {
        onChange(index);
        modal.close();
    };

    return (
        <MiddleModalWrp title={title}>
            <ul>
                {list.map<ReactElement>((text, index) => (
                    <li key={index}>
                        <p className={css.text}>Шаблон № {index + 1}</p>
                        <button
                            type="button"
                            className={css.link}
                            onClick={handleChange(index)}
                            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }}
                        />
                    </li>
                ))}
            </ul>
        </MiddleModalWrp>
    );
};

export default FormTemplateModal;
