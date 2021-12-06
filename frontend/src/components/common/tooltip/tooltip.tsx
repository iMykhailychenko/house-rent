import { useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import useTrans from '../../../hooks/trans.hook';

import css from './tooltip.module.scss';

interface IProps {
    className?: string;
    withMobile?: boolean;
    children: JSX.Element | JSX.Element[];
    content?: boolean | string | JSX.Element | JSX.Element[];
    hidden?: boolean;
}

type PositionClassNames = 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';

const Tooltip = ({ children, withMobile = false, className, content, hidden = false }: IProps): JSX.Element => {
    const trans = useTrans();
    const ref = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<PositionClassNames>('top_right');

    const handleTooltipPosition = useCallback((): void => {
        if (!ref.current) return;
        const isTop = ref.current?.getBoundingClientRect().top / window.innerHeight > 0.1;
        const isLeft = ref.current?.getBoundingClientRect().left / window.innerHeight > 0.6;
        setPosition(`${isTop ? 'top' : 'bottom'}_${isLeft ? 'left' : 'right'}` as PositionClassNames);
    }, [ref]);

    useEffect(() => {
        handleTooltipPosition();
    }, [handleTooltipPosition]);

    const handleHover = (): void => handleTooltipPosition();

    return (
        <div ref={ref} className={clsx(css.wrp, className, { [css.mobile]: withMobile })} onMouseEnter={handleHover}>
            {!hidden && content && (
                <div className={clsx(css.tooltip, css[position], 'tooltip')}>
                    {typeof content === 'string' ? trans(content) : content}
                </div>
            )}
            {children}
        </div>
    );
};

export default Tooltip;
