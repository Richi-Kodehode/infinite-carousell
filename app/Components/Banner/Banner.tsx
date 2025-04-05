import styles from "./Banner.module.css";
import { RANDOM_IMAGES } from "../../dragonImages";
import Slider from "./Slider";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Slider images={RANDOM_IMAGES} />
    </div>
  );
}
