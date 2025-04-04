interface SlideImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface SlideContent {
  title: string;
  description: string[];
}

export interface Slide extends SlideImage {
  content: SlideContent;
}

export const SLIDE_IMAGES: Slide[] = [
  {
    src: "/ImgSliderImg/1.jpg",
    alt: "Dragon 1",
    content: {
      title: "Richi",
      description: ["Description 1"],
    },
  },
  {
    src: "/ImgSliderImg/2.jpg",
    alt: "Dragon 2",
    content: {
      title: "is",
      description: ["Description 2"],
    },
  },
  {
    src: "/ImgSliderImg/3.jpg",
    alt: "Dragon 3",
    content: {
      title: "A GOD!!!",
      description: ["Description 3"],
    },
  },
  {
    src: "/ImgSliderImg/1.jpg",
    alt: "Dragon 4",
    content: {
      title: "test",
      description: ["Description 3"],
    },
  },
];
