import React from "react";
import { Carousel } from "react-responsive-carousel";
import { imgList } from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {imgList.map((imageItemLink, i) => {
          return <img src={imageItemLink} alt="" key={i} />;
        })}
      </Carousel>
     
    </div>
  );
}

export default CarouselEffect;
