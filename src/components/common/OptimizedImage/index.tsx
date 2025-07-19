import * as m from "motion/react-m";

const getResponsiveSizes = (path: string, variant: string) => {
  if (variant === "Home") {
    return {
      src: `${path}?tr=w-250,h-333`, // tr is the transformation param
      srcSet: `
        ${path}?tr=w-120,h-180 120w,
        ${path}?tr=w-150,h-200 150w,
        ${path}?tr=w-180,h-230 180w,
        ${path}?tr=w-210,h-300 210w,
        ${path}?tr=w-230,h-300 230w,
        ${path}?tr=w-250,h-333 250w
      `,
      sizes:
        "(max-width:330px) 120px, (max-width:390px) 150px, (max-width: 500px) 180px, (max-width: 600px) 210px, (max-width: 800px) 230px, 250px",
    };
  }

  return {
    src: `${path}?tr=w-${250},h-${333}`,
    srcSet: `${path}?tr=w-${250},h-${333}`,
    sizes: `${250}px`,
  };
};

interface OptimizedImageProps {
  path: string;
  alt: string;
  variant: "Home";
  className: string;
  role?: string;
  loading?: "eager" | "lazy" | undefined;
  onDragStart?: (...props: any) => void;
  isAnimated?: boolean;
}

const OptimizedImage = ({
  path,
  alt,
  variant,
  className = "",
  role,
  loading,
  onDragStart,
  isAnimated = false,
}: OptimizedImageProps) => {
  const { src, srcSet, sizes } = getResponsiveSizes(path, variant);
  return (
    <>
      {isAnimated ? (
        <m.img
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 1.03 }}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          onDragStart={onDragStart}
          role={role}
          className={className}
          alt={alt}
          loading={loading}
        />
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          onDragStart={onDragStart}
          role={role}
          className={className}
          alt={alt}
          loading={loading}
        />
      )}
    </>
  );
};

export default OptimizedImage;
