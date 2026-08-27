import Image from "next/image";

// Only for when the caption must differ from the alt text — plain markdown
// `![alt](src)` covers everything else. Explicit width/height, no layout shift.
type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  // Set on whichever image leads a page — it's the LCP candidate, and
  // without this Next lazy-loads it and dings load performance.
  priority?: boolean;
};

export function Figure({ src, alt, caption, width, height, priority }: FigureProps) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 640px) 640px, 100vw"
        priority={priority}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
