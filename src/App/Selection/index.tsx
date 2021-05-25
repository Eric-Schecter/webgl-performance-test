import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { table } from '../viz/player/creator';

type Props = {
  cb: (state: string) => void;
  isDark: boolean;
}

const list = Object.keys(table);

export const Selection = ({ cb, isDark }: Props) => {
  const [state, setState] = useState(list[0]);
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
    {list.map(d => <option key={d}>{d}</option>)}
  </select>
}