import type { IconProps } from '@radix-ui/react-icons/dist/types';
import * as React from 'react';

export const PenpotLogo = React.forwardRef<SVGSVGElement, IconProps>(
  (props, forwardedRef) => {
    return (
      <svg
        height="500"
        viewBox="0 0 500 500.00001"
        width="500"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="m159.4607 552.36219-52.57675 74.05348v41.86098l-45.753774 21.76184-.412151-.19478v17.20283 255.89707l178.379885 84.27239 10.90209 5.1462 10.89926-5.1462 178.38271-84.27239v-273.0999l-.33593.15808-45.76789-21.76749v-41.81863l-1.60059-2.25268-50.97899-71.8008-52.57958 74.05348v.0734l-38.25894-53.88377-37.96254 53.4688-1.35782-1.91111zm9.3015 43.01555 20.33627 28.64128h-59.27553l20.09914-28.30535zm181.13787 0 20.33626 28.64128h-59.27553l20.09632-28.30535zm-90.83852 20.24593 20.33626 28.63846h-59.2727l20.09631-28.30535zm-134.85903 22.82891h28.11339v94.66356l-28.11339-13.2818zm42.54695 0h27.97224l-.003 114.69495-27.97224-13.21405zm138.58809 0h28.11622l-.003 101.38492-28.11057 13.27898-.003-114.6639zm42.54695 0h27.97224v81.3507l-27.97224 13.21406zm-133.38265 20.24311h28.11339v117.07749l-28.11339-13.2818zm42.54695 0h27.97225l-.003 104.02152-27.97224 13.21688.003-117.2384zm136.12651 31.11133 24.75131 10.12014-24.75131 11.6925zm-286.29137.0367v21.80982l-24.748483-11.6925zm-24.367392 34.4113 156.581352 73.96879v224.87888l-156.581352-73.96877zm334.964042 0v224.8789l-156.58134 73.96877v-224.87888z"
          transform="translate(0 -552.3622)"
        />
      </svg>
    );
  }
);

PenpotLogo.displayName = 'PenpotLogo';
