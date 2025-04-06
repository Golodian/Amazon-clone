import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../Product/ProductCard";
import style from "./Product.module.css";
import Loader from "../Loader/Loader";

// / Adjust the path if needed

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] =useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data); // Debugging
        setProducts(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false)
      });
  }, []);

  return (
    <>
      {isLoading? (
        <Loader/>
      ) : (
        <section className={style.product_container}>
          {products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id } renderAdd={true} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
