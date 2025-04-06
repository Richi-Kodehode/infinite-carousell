import { RANDOM_IMAGES } from "./randomImage";
import Slider from "./Components/Banner/Slider";

// import ImgSlider from "./Components/ImageSlider/ImgSlider";

// import { SLIDE_IMAGES } from "./slideImages";

export default function Home() {
  return (
    <div>
      <Slider images={RANDOM_IMAGES} />
      {/* <ImgSlider slides={SLIDE_IMAGES} /> */}
    </div>
  );
}
