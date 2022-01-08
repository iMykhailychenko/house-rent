import React, { useState } from 'react';

import HMobiledataOutlinedIcon from '@mui/icons-material/HMobiledataOutlined';
import HPlusMobiledataOutlinedIcon from '@mui/icons-material/HPlusMobiledataOutlined';
import { Stack } from '@mui/material';
import Slider from '@mui/material/Slider';

import appConfig from '../../../../../config/app.config';
import useConfig from '../../../../../hooks/config.hook';
import Button from '../../../button/button';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './chat-font-size.module.scss';

export const ChatFontSize = (): JSX.Element => {
    const [config, setConfig] = useConfig();
    const [value, setValue] = useState(config.chatFontSize);

    const handleChange = (_: Event, value: number | number[]): void => {
        setValue(+value / 10);
    };

    const setDefault = (): void => setValue(appConfig.chatFontSize);

    const submit = (): void => {
        setConfig({ ...config, chatFontSize: value });
        modal.close();
    };

    return (
        <StickyModal
            title="Змінити шрифт"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary onClick={submit}>
                        Зберегти
                    </Button>
                </>
            }
        >
            <>
                <label htmlFor="fontSize">Розмір шрифту</label>

                <Stack className={css.slider} spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <HMobiledataOutlinedIcon />
                    <Slider
                        defaultValue={50}
                        value={value * 10}
                        aria-label="Розмір шрифту"
                        onChange={handleChange}
                        min={10}
                        max={20}
                    />
                    <HPlusMobiledataOutlinedIcon />
                </Stack>

                <p className={css.text} style={{ fontSize: value + 'rem' }}>
                    Виберіть зручний для вас зормір шрифту повідомлень
                </p>

                <Button onClick={setDefault} secondary>
                    Повернути дефолтне значення
                </Button>
            </>
        </StickyModal>
    );
};

const chatFontSize = (): void => {
    modal.open(<ChatFontSize />);
};

export default chatFontSize;
