import React, { ReactElement } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import MiddleModalWrp from '../../../../../common/modal/middle-modal-wrp/middle-modal-wrp';
import { modal } from '../../../../../common/modal/modal';

import css from './form-template-modal.module.scss';

interface FormTemplateModalItemProps {
    index: number;
    text: string;
    onChange: (index: number) => void;
}

const FormTemplateModalItem = ({ onChange, index, text }: FormTemplateModalItemProps): ReactElement => {
    const handleChange = () => {
        onChange(index);
        modal.close();
    };

    return (
        <Accordion defaultExpanded={index === 0} className={css.accordion}>
            <AccordionSummary
                disableRipple={false}
                expandIcon={<ExpandMoreIcon className={css.icon} />}
                aria-controls={`Шаблон № {index + 1}`}
                id={'AccordionSummary' + index}
            >
                <Typography className={css.text}>Шаблон № {index + 1}</Typography>
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
    const handleChange = (index: number) => {
        onChange(index);
        modal.close();
    };

    return (
        <MiddleModalWrp title={title}>
            <ul>
                {list.map<ReactElement>((text, index) => (
                    <li key={index}>
                        <FormTemplateModalItem text={text} index={index} onChange={handleChange} />
                    </li>
                ))}
            </ul>
        </MiddleModalWrp>
    );
};

export default FormTemplateModal;
