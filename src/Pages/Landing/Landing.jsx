import React from "react";
import LayOut from "../../Components/LayOut/LayOut";


import Category from "../../Components/Category/Category";
import Product from "../../Components/product/product";
import CarouselEffect from "../../Components/Carousel/Carousel";


function Landing() {
  return (
    
      <LayOut>
        <CarouselEffect/>
        <Category/>
        <Product/>
      </LayOut>
    
  );
}

export default Landing;
