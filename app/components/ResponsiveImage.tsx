import Image from "next/image";
import { getImageDimensions } from "../lib/content";

export default function ResponsiveImage({
  imageBase,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1180px",
}: {
  imageBase: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { width, height } = getImageDimensions(imageBase);
  return (
    <Image
      alt={alt}
      className={className}
      height={height}
      priority={priority}
      sizes={sizes}
      src={`/images/${imageBase}-1600.webp`}
      width={width}
    />
  );
}
