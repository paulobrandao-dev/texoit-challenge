import { Reducer, useEffect, useReducer } from 'react';

interface MediaQueries {
  width: number;
  height: number;
  isCompactScreen: boolean;
  isLargeThenCompact: boolean;
  isMediumScreen: boolean;
  isExpandedScreen: boolean;
  isSmallThenExpanded: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

type MediaQueryReducer = Reducer<MediaQueries, Partial<MediaQueries>>;

const reducer: MediaQueryReducer = (state, changes) => ({
  ...state,
  ...changes,
});

const checkScreen = (): MediaQueries => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isPortrait = height > width;
  const isLandscape = width > height;

  return {
    width,
    height,
    isCompactScreen: width <= 599,
    isLargeThenCompact: width > 599,
    isMediumScreen: width >= 600 && width <= 839,
    isExpandedScreen: width >= 840,
    isSmallThenExpanded: width < 840,
    isPortrait,
    isLandscape,
  };
};

export function useMediaQuery() {
  const [media, setMedia] = useReducer(reducer, checkScreen());

  const updateStore = () => {
    setMedia(checkScreen());
  };

  useEffect(() => {
    window.addEventListener('resize', updateStore);
    return () => {
      window.removeEventListener('resize', updateStore);
    };
  }, []);

  return media;
}
