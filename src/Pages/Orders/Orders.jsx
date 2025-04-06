

import React, { useEffect, useContext, useState } from "react";
import classes from "./Order.module.css";
import LayOut from "../../Components/LayOut/LayOut.jsx";
import ProductCard from "../../Components/Product/ProductCard.jsx";
import { db } from "../../Utility/firebase.js"
import { DataContext } from "../../Components/DataProvider/DataProvider.jsx";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("Orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot?.docs?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders</h2>

          {orders.length == 0 && (
            <p style={{ padding: "20px" }}>You don't have orders yet.</p>
          )}
          <div>
            {orders?.map((eachOrders, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrders?.id}</p>

                  {eachOrders?.data?.basket?.map((Order) => (
                    <ProductCard flex={true} product={Order} key={Order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;


