import React, { useEffect, useRef, useState } from 'react';
import type { Decorator } from '@storybook/react';
import Framebus from 'framebus';

export const IFrameStorybook: Decorator = (Story) => {
  const { current: bus } = useRef(new Framebus());
  const { current: styleHost } = useRef(document.createElement('style'));
  const [css, setCss] = useState<string>('');

  useEffect(() => {
    const callback = (data) => {
      console.log({ data });
      setCss(data.result.outputFiles[0].contents);
    };
    bus.on('style-changes', callback);
    return () => {
      bus.off('style-changes', callback);
    };
  }, [bus]);

  useEffect(() => {
    document.body.appendChild(styleHost);
  }, []);

  styleHost.innerHTML = css;
  console.log({ css });

  return <Story />;
};
