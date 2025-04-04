// components/Banner/Slider.tsx
"use client";

import Image from "next/image";
import styles from "./Slider.module.css";
import { DRAGON_IMAGES } from "./data/dragonImages";

// Type for CSS custom properties
interface SliderStyles extends React.CSSProperties {
  "--quantity": number;
}

interface ItemStyles extends React.CSSProperties {
  "--position": number;
}

export default function Slider() {
  return (
    <div
      className={styles.slider}
      style={{ "--quantity": DRAGON_IMAGES.length } as SliderStyles}
    >
      {DRAGON_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={styles.item}
          style={{ "--position": index + 1 } as ItemStyles}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100px, (max-width: 1024px) 160px, 200px"
            quality={85}
            priority={index < 3}
          />
        </div>
      ))}
    </div>
  );
}
