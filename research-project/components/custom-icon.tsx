import Image from 'next/image';

interface CustomIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function CustomIcon({ src, alt, size = 40, className = "" }: CustomIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`pointer-events-none ${className}`}
      style={{ filter: 'brightness(0) invert(1)' }} // Makes SVG white
    />
  );
}