import React, { useRef, useEffect, useState, RefObject, useCallback } from 'react';
import styles from './index.module.scss';
import { Viz } from './viz';
import { ViewMode } from './ViewMode';
import { Selection } from './Selection';
import { DarkMode } from './DarkMode';

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
  const changeMode = useCallback((mode: boolean) => viz?.changeMode(mode), [viz]);
  const changeType = useCallback((mode: string) => viz?.changeType(mode), [viz]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!viz) { return }
    viz.changeDarkMode(isDarkMode);
  }, [isDarkMode, viz])
  
  return <div className={styles.root}>
    <Selection cb={changeType} isDark={isDarkMode} />
    <DarkMode cb={setIsDarkMode} isDark={isDarkMode}/>
    <ViewMode cb={changeMode} isDark={isDarkMode} />
    <canvas ref={ref} className={styles.canvas}/>
  </div>
}