import React, { ReactElement, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import clsx from 'clsx';

import Button from '../../../../../common/button/button';
import { modal } from '../../../../../common/modal/modal';
import StickyModal from '../../../../../common/modal/sticky-modal/sticky-modal';

import css from './form-template-modal.module.scss';

interface FormTemplateModalItemProps {
    index: number;
    active: number;
    text: string;
    onChange: (index: number) => void;
}

const FormTemplateModalItem = ({ onChange, index, active, text }: FormTemplateModalItemProps): ReactElement => {
    const handleChange = () => onChange(index);
    return (
        <Accordion defaultExpanded={index === 0} className={clsx(css.accordion, active === index && css.active)}>
            <AccordionSummary
                disableRipple={false}
                expandIcon={<ExpandMoreIcon className={css.icon} />}
                aria-controls={`Шаблон № ${index + 1}`}
                id={'AccordionSummary' + index}
            >
                <p className={css.text}>Шаблон № {index + 1}</p>
            </AccordionSummary>
            <AccordionDetails className={css.details}>
                <button
                    type="button"
                    className={css.btn}
                    onClick={handleChange}
                    dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }}
                />
            </AccordionDetails>
        </Accordion>
    );
};

interface FormTemplateModalProps {
    title?: string;
    list: string[];
    onChange: (index: number) => void;
}

const FormTemplateModal = ({ title, list, onChange }: FormTemplateModalProps): ReactElement => {
    const [selected, setSelected] = useState<number>(0);

    const handleChange = () => {
        onChange(selected);
        modal.close();
    };

    return (
        <StickyModal title={title}>
            <>
                <ul>
                    {list.map<ReactElement>((text, index) => (
                        <li key={index}>
                            <FormTemplateModalItem text={text} active={selected} index={index} onChange={setSelected} />
                        </li>
                    ))}
                </ul>
                <div className={css.flex}>
                    <Button onClick={modal.close} secondary>
                        Скасувати
                    </Button>
                    <Button onClick={handleChange} primary>
                        Обрати шаблон
                    </Button>
                </div>
            </>
        </StickyModal>
    );
};

export default FormTemplateModal;
