"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  place: string;
};

export default function TrackLink({ event, place, onClick, href, ...rest }: Props) {
  const fire = () => {
    const url = `/api/track?e=${encodeURIComponent(event)}&p=${encodeURIComponent(place)}`;
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([], { type: "text/plain" }));
      } else {
        fetch(url, { method: "GET", keepalive: true, cache: "no-store" }).catch(() => {});
      }
    } catch {
      fetch(url, { method: "GET", keepalive: true, cache: "no-store" }).catch(() => {});
    }
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    fire();
    onClick?.(e);
  };

  return <a href={href} {...rest} onClick={handleClick} />;
}