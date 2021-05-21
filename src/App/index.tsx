import React, { useRef, useEffect, useState, RefObject } from 'react';
import styles from './index.module.scss';
import { Viz } from './viz';
// import { Mode } from './Mode';
import { Selection } from './Selection';

const useCreateViz = (ref: RefObject<HTMLCanvasElement>) => {
  const [viz, setViz] = useState<Viz>();
  useEffect(() => {
    if (!ref.current) { return }
    const viz = new Viz(ref.current);
    setViz(viz);
    return viz.unregister;
  }, [ref])
  return viz;
}

export const App = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const viz = useCreateViz(ref);
  // const changeMode = (mode: string) => viz?.changeMode(mode)
  const changeType = (mode: string) => viz?.changeType(mode)

  useEffect(() => {
    if (!viz) { return }
  }, [viz])

  return <div className={styles.root}>
    <Selection cb={changeType} />
    {/* <Mode cb={changeMode} /> */}
    <canvas ref={ref} className={styles.canvas} />
  </div>
}