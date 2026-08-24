import Image from "next/image";

// Only for when the caption must differ from the alt text — plain markdown
// `![alt](src)` covers everything else. Explicit width/height, no layout shift.
type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure>
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 640px) 640px, 100vw" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
