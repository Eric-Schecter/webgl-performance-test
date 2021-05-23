import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

type Props = {
  cb: (state: boolean) => void;
}

const data = ['2D', '3D'];

export const Mode = ({ cb }: Props) => {
  const [state, setState] = useState('2D');
  useEffect(() => {
    cb(state === '2D');
  }, [state, cb])
  return <div className={styles.mode}>
    {data.map(d =>
      <div
        key={d}
        onClick={() => setState(d)}
        className={d===state ? styles.isSelected : ''}
      >
        {d}
      </div>
    )}
  </div>
}