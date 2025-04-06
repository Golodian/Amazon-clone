import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./product.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  console.log(product);

  const [state, dispatch] = useContext(DataContext);
  console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      }
    });
  };

  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "650px" }}>{description}</div>}
        <div className={styles.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count*/}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
{renderAdd && (  <button className={styles.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

// import React from "react";
// import Rating from "@mui/material/Rating";
// import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
// import style from "./Product.module.css";

// function ProductCard({ product }) {
//   const { image, title, id, rating, price } = product;
//   return (
//     <div className={style.card__container}>
//       <a href="">
//         <img src={image} alt="" />
//       </a>
//       <div className={style.product__details}>
//         <h3 className={style.product__title}>{title}</h3>{" "}
//         {/* added title here */}
//         <div className={style.product__rating}>
//           {/* rating */}
//           {rating && ( // Only render if rating exists
//             <>
//               <Rating value={rating.rate} precision={0.1} readOnly />{" "}
//               {/* added read only here */}
//               {/* count*/}
//               <small>{rating.count}</small>
//             </>
//           )}
//           {/* {!rating && <small>No rating</small>} */}
//         </div>
//         <div className={style.product__price}>
//           {/* price */}
//           <CurrencyFormat amount={price} />
//         </div>
//         <button className={style.product__button}>add to cart</button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;
