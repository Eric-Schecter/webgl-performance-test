import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { list } from '../viz/creator';

type Props = {
  cb: (state: string) => void;
  isDark: boolean;
}

const data = Object.keys(list);

export const Selection = ({ cb, isDark }: Props) => {
  const [state, setState] = useState(data[0]);
  useEffect(() => {
    cb(state);
  }, [state, cb])
  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  }
  return <select
    className={`${styles.selection} ${isDark ? styles.isDark : ''}`}
    value={state}
    onChange={change}>
    {data.map(d => <option key={d}>{d}</option>)}
  </select>
}