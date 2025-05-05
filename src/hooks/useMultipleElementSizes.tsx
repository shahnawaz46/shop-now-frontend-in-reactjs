import { useLayoutEffect, useRef, useState } from "react";

type TSize = {
  height: number[];
  width: number[];
};

const useMultipleElementSizes = <T extends HTMLElement>() => {
  const [sizes, setSizes] = useState<TSize>({ height: [0], width: [0] });
  const elementRefs = useRef<(T | null)[]>([]);

  useLayoutEffect(() => {
    const heights: number[] = [];
    const widths: number[] = [];

    elementRefs.current.forEach((el) => {
      if (!el) return;

      const { width, height } = el.getBoundingClientRect();
      heights.push(height);
      widths.push(width);
    });

    setSizes({ height: heights, width: widths });
  }, []);

  const totalHeight: number = sizes.height.reduce(
    (total, current) => total + current,
    0
  );
  const totalWidth: number = sizes.width.reduce(
    (total, current) => total + current,
    0
  );

  return {
    elementRefs,
    height: sizes.height,
    width: sizes.width,
    totalHeight,
    totalWidth,
  };
};

export default useMultipleElementSizes;
