import React from 'react';
import style from './style.m.less';
import logo from '../../../images/pohColor.svg';

export default () => (
    <div className={style.logo}>
        <img src={logo} height={32} className={style.image} />
        <span>
            Походники<br />
            Пензы
        </span>
    </div>
)
