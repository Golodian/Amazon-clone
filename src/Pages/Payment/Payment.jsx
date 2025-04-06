import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
    const handleChange = (e) => {
      if (e.error) {
        setCardError(e.error.message);
      } else {
        setCardError(null);
      }
    };
  };
 const handlePayment = async (e) => {
  e.preventDefault();
  try {
    setProcessing(true);

    // 1. Create a payment intent on the backend
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`, // Fix: Correct URL syntax
    });

    const clientSecret = response.data?.clientSecret;
    if (!clientSecret) {
      console.error("Client secret not received");
      setProcessing(false);
      return;
    }

    console.log("Client Secret:", clientSecret);

    // 2. Confirm the payment on the client side
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
      setProcessing(false);
      return;
    }

    console.log("Payment Intent:", paymentIntent);

    // 3. Write order to Firestore after successful payment
    if (paymentIntent.status === "succeeded") {
      if (!user) {
        console.error("User is not authenticated");
        setProcessing(false);


        return;
      }

      await db
        .collection("users")
        .doc(user.uid)
        .collection("Orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      console.log("Order saved to Firestore");

      // 4. Dispatch action to clear the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setProcessing(false);

      // 5. Navigate to orders page with a success message
      navigate("/Orders", { state: { msg: "You have placed a new order" } });
    }
  } catch (error) {
    console.error("Error during payment:", error);
    setProcessing(false);
  }
};




  return (
    <LayOut>
      {/* header */}
      <div className={style.payment_header}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={style.payment}>
        {/* address */}

        <div className={style.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1123 React Lane</div>
            <div>chicago,IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={style.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={style.flex}>
          <h3>payment methods</h3>
          <div className={style.payment_card_container}>
            <div className={style.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* cardelement */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={style.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order</p> |
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={style.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please Wait...</p>
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
