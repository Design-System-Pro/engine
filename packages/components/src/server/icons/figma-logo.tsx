import type { IconProps } from '@radix-ui/react-icons/dist/types';
import * as React from 'react';

export const FigmaLogo = React.forwardRef<SVGSVGElement, IconProps>(
  (props, forwardedRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="288"
        height="432"
        viewBox="0 0 288 432"
        fill="none"
        preserveAspectRatio="xMinYMin"
        {...props}
        ref={forwardedRef}
      >
        <path
          fill="none"
          d="M0 0H95.023V142.534H0z"
          transform="matrix(3 0 0 3 1.466 2.2)"
        />
        <path
          fill="#1ABCFE"
          d="M144 216c0-39.359 31.907-71.267 71.267-71.267 39.359 0 71.267 31.908 71.267 71.267 0 39.36-31.908 71.267-71.267 71.267C175.907 287.267 144 255.36 144 216Z"
        />
        <path
          fill="#0ACF83"
          d="M1.466 358.534c0-39.359 31.907-71.267 71.267-71.267H144v71.267c0 39.36-31.907 71.267-71.267 71.267S1.466 397.894 1.466 358.534Z"
        />
        <path
          fill="#FF7262"
          d="M144 2.2v142.533h71.267c39.36 0 71.267-31.907 71.267-71.267S254.627 2.2 215.267 2.2H144Z"
        />
        <path
          fill="#F24E1E"
          d="M1.466 73.466c0 39.36 31.907 71.267 71.267 71.267H144V2.199H72.733c-39.36 0-71.267 31.908-71.267 71.267Z"
        />
        <path
          fill="#A259FF"
          d="M1.466 216c0 39.36 31.907 71.267 71.267 71.267H144V144.733H72.733c-39.36 0-71.267 31.908-71.267 71.267Z"
        />
      </svg>
    );
  }
);

FigmaLogo.displayName = 'FigmaLogo';
