import styles from "./Banner.module.css";
import { DRAGON_IMAGES } from "../../dragonImages";
import Slider from "./Slider";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Slider images={DRAGON_IMAGES} />
    </div>
  );
}
