import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import useMaxWidth from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';

import css from './tooltip.module.scss';

interface IProps {
    className?: string;
    classNameWrp?: string;
    withMobile?: boolean;
    children: ReactElement | ReactElement[];
    content?: boolean | string | ReactElement | ReactElement[];
    hidden?: boolean;
}

type PositionClassNames = 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';

const Tooltip = ({ children, withMobile = false, className, classNameWrp, content, hidden = false }: IProps): ReactElement => {
    const trans = useTrans();
    const media = useMaxWidth(768);
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

    return media || withMobile ? (
        <div ref={ref} className={clsx(css.wrp, classNameWrp)} onMouseEnter={handleHover}>
            {!hidden && content && (
                <div className={clsx(css.tooltip, css[position], 'tooltip', className)}>
                    {typeof content === 'string' ? trans(content) : content}
                </div>
            )}
            {children}
        </div>
    ) : (
        <>{children}</>
    );
};

export default Tooltip;
