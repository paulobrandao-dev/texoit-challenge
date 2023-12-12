import './CircularProgress.scss';

export const CircularProgress = () => {
  return (
    <svg className="CircularProgress">
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
