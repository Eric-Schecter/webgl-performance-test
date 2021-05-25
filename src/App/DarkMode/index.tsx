import React, { SetStateAction, Dispatch } from 'react';
import styles from './index.module.scss';

type Props = {
  cb: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

export const DarkMode = ({ cb, isDark }: Props) => {
  return <div
    className={`${styles.darkmode} ${isDark ? styles.isDark : ''}`}
    onClick={() => cb(!isDark)}>
    {isDark ? 'Dark' : 'Light'}
  </div>
}