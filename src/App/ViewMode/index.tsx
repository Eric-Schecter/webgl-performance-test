import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

type Props = {
  cb: (state: boolean) => void;
  isDark:boolean;
}

const data = ['2D', '3D'];

export const ViewMode = ({ cb ,isDark}: Props) => {
  const [state, setState] = useState('2D');
  useEffect(() => {
    cb(state === '2D');
  }, [state, cb])
  return <div className={styles.mode}>
    {data.map(d =>
      <div
        key={d}
        onClick={() => setState(d)}
        className={`${d===state ? styles.isSelected : isDark ? styles.isDark : ''}`}
      >
        {d}
      </div>
    )}
  </div>
}