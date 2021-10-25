import React, { useEffect, useRef } from 'react';

import LoginApp from './app/app';
import css from './login-app.module.scss';

const LoginComponent = (): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const app = useRef<LoginApp | null>(null);

    useEffect(() => {
        if (ref.current) {
            app.current = new LoginApp(ref.current);
            app.current?.start();
        }

        return () => {
            app.current?.unsubscribe();
            app.current = null;
        };
    }, [ref, app]);

    return (
        <div className={css.root} ref={ref}>
            <img src="/spinner.gif" alt="" />
        </div>
    );
};

export default LoginComponent;
