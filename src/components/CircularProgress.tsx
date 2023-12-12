import { SVGProps } from 'react';
import './CircularProgress.scss';

export const CircularProgress = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg className="CircularProgress" {...props}>
      <circle
        className="path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
