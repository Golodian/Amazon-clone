// import React from 'react'
// import LayOut from '../../Components/LayOut/LayOut'
// import ProductCard from '../../Components/product/productCard';

// function Cart() {
//   return (

//       <LayOut>
//         <section>
//           <div>
//             <h2>Hello</h2>
//             <h3>Your shopping basket</h3>
//             <br/>
//             {
//               basket?.length===0?(<p>Opps ! No item in your cart</p>):(
// basket?.map(item,i)=>{
//   return (
//   <ProductCard
//   key={i}
//   product={item}
//   renderDesc={true}
//   flex={true}

//   />
// )}

//               )
//             }
//           </div>
//         </section>
//         </LayOut>

//   );
// }

// export default Cart

import { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./Cart.module.css"
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { Type } from "../../Utility/action.type";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import {IoIosArrowDown} from "react-icons/io"
import {IoIosArrowUp} from "react-icons/io"
import { Link } from "react-router-dom";

function Cart() {
  // Get basket from context
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

const decrement= (id)=>{
  dispatch({
    type: Type.REMOVE_FROM_BASKET,
    id,
  })
}


return (
  <LayOut>
    <section className={style.container}>
      <div className={style.cart__container}>
        <h2>hello</h2>
        <h3>Your shopping basket</h3>
        <hr />
        {basket?.length === 0 ? (
          <p>Opps ! No items in your cart</p>
        ) : (
          basket?.map((item, i) => {
            return (
              <section className={style.cart_product}>
                <ProductCard
                  key={i}
                  product={item}
                  flex={true}
                  renderDesc={true}
                  renderAdd={false}
                />

                <div className={style.btn_container}>
                  <button
                    className={style.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={30} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={style.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={30} />
                  </button>
                </div>
              </section>
            );
          })
        )}
      </div>
      {basket?.length !== 0 && (
        <div className={style.subtotal}>
          <div>
            <p>subtotal({basket?.length}items)</p>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small>this order contains a gift</small>
          </span>
          <Link to="/payments">Continue to CheckOut</Link>
        </div>
      )}
    </section>
  </LayOut>
);
}

export default Cart;
