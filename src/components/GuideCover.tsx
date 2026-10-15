type Props = {
  image?: string;
  imageSmall?: string;
  imageAlt?: string;
  priority?: boolean;
  sizes?: string;
};

export default function GuideCover({ image, imageSmall, imageAlt, priority, sizes = "(max-width: 700px) calc(100vw - 40px), (max-width: 1160px) 46vw, 535px" }: Props) {
  if (!image) return null;
  return <img className="guide-cover" src={image} srcSet={imageSmall ? `${imageSmall} 640w, ${image} 1200w` : undefined}
    sizes={sizes} width={1200} height={630} alt={imageAlt || ""}
    loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} />;
}
