import Image from "next/image";
import styles from "./Slider.module.css";

interface SliderStyles extends React.CSSProperties {
  "--quantity": number;
}

interface ItemStyles extends React.CSSProperties {
  "--position": number;
}
interface SliderProps {
  /**
   * Array of image objects to be displayed in the slider.
   * Each object should contain a `src` and `alt` property.
   * Slider looks best with meximum 10 images.
   */
  images: {
    src: string;
    alt: string;
  }[];
}

export default function Slider({ images }: SliderProps) {
  return (
    <div
      className={styles.slider}
      style={{ "--quantity": images.length } as SliderStyles}
    >
      {images.map((image, index) => (
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
