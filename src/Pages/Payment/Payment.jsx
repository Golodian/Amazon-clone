import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
                    //  <CurrencyFormat amount={total} />

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  {
    /*function for telling us total item on the cart */
  }
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  {
    /*function for clacultating total price */
  }

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  {
    /*defining error handling function */
  }
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      //1/ firststep when we do payment with function is contacting the back end||function to get the client secret

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, //this means using "post method + baseurl+/payment/create" to get clientsecret
      });

      // console.log(response.data);
      const clienSecret = response.data?.clientSecret; // we only need the clinentSecret from the whole response i.e response.data thats wahy we wriet (response.data?.clinentSecret)

      // 2. clinet side(react side confirmation) using stripe

      const { paymentIntent } = await stripe.confirmCardPayment(clienSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      //3. after the confirmation -- the orders are removed from the cart and will store on the firebase store db and it will be displayed on the order page

      await db
        .collection("users") //its like a table collecting or organizing the data
        .doc(user.uid) //we store the document using the user id and we creat a collection to this specific user using user id
        .collection("orders") //we creat a collection by this user id i.e it makes the order specicif to the user
        .doc(paymentIntent.id)

        .set({
          // finally we set the basket the amount andcreated payment intent
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      //emptying the basket

      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new orders" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/*header */}
      <div className={classes.payment_header}>Checkout ({totalItem} )items</div>

      <section className={classes.payment}>
        {/*addresse */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>7710 Maple avenue</div>
            <div>Takoma Park, MD</div>
          </div>
        </div>
        <hr />
        {/* {/products/} */}
        <div className={classes.flex}>
          <h3>Review itrem and deliver info. </h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/*paymentform */}
        <div className={classes.flex}>
          <h3>payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/*display error if there is */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/*importing smart card from stripe */}
                <CardElement onChange={handleChange} />

                {/*price total */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={35} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;


