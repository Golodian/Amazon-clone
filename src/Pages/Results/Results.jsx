import React, { useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product/ProductCard";
import axios from "axios";
import styles from "./Results.module.css"
import { productUrl } from "../../Api/endPoint";
function Results() {
  const { categoryName } = useParams();
  const [results, setResults]= useState([])
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <h1 styles={{ padding: "30px" }}>Results</h1>
      <p styles={{ padding: "30px" }}>Category/{categoryName}</p>
      <div className={styles.products_container}>{results?.map((products,i)=>{


           return <ProductCard key={i} product={products}/>



      })}</div>
    </LayOut>
  );
}

export default Results;
