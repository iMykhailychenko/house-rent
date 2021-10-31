import React, { useState, MouseEvent } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';

import Button from '../../../../../common/button/button';
import StickyModal from '../../../../../common/modal/components/sticky-modal/sticky-modal';
import { modal } from '../../../../../common/modal/modal';

import css from './form-template-modal.module.scss';

interface FormTemplateModalItemProps {
    index: number;
    active: number;
    text: string;
    onChange: (index: number) => void;
}

const FormTemplateModalItem = ({ onChange, index, active, text }: FormTemplateModalItemProps): JSX.Element => {
    const handleChange = () => onChange(index);
    const [open, setOpen] = useState<boolean>(index === 0);
    const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        setOpen(prev => !prev);
    };

    return (
        <Accordion onClick={handleChange} expanded={open} className={clsx(css.accordion, active === index && css.active)}>
            <AccordionSummary
                disableRipple={false}
                expandIcon={
                    <IconButton className={css.arrowBtn} onClick={handleOpen}>
                        <ExpandMoreIcon className={css.icon} />
                    </IconButton>
                }
                aria-controls={`Шаблон № ${index + 1}`}
                id={'AccordionSummary' + index}
            >
                <p className={css.text}>Шаблон № {index + 1}</p>
            </AccordionSummary>
            <AccordionDetails className={css.details}>
                <p className={css.content} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />
            </AccordionDetails>
        </Accordion>
    );
};

interface FormTemplateModalProps {
    title?: string;
    list: string[];
    onChange: (index: number) => void;
}

const FormTemplateModal = ({ title, list, onChange }: FormTemplateModalProps): JSX.Element => {
    const [selected, setSelected] = useState<number>(0);

    const handleChange = () => {
        onChange(selected);
        modal.close();
    };

    return (
        <StickyModal
            title={title}
            footer={
                <>
                    <Button onClick={modal.close} secondary>
                        Скасувати
                    </Button>
                    <Button className={css.primary} onClick={handleChange} primary>
                        Обрати шаблон
                    </Button>
                </>
            }
        >
            <ul>
                {list.map<JSX.Element>((text, index) => (
                    <li key={index}>
                        <FormTemplateModalItem text={text} active={selected} index={index} onChange={setSelected} />
                    </li>
                ))}
            </ul>
        </StickyModal>
    );
};

export default FormTemplateModal;
