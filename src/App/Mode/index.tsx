import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

type Props = {
  cb: (state: string) => void;
}

const data = ['2D', '3D'];

export const Mode = ({ cb }: Props) => {
  const [state, setState] = useState('2D');
  useEffect(() => {
    cb(state);
  }, [state, cb])
  return <div className={styles.mode}>
    {data.map(d => <div key={d} onClick={() => setState(d)}>{d}</div>)}
  </div>
}