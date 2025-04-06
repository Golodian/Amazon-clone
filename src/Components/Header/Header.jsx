import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import style from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log({ basket }.length);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={style.fixed}>
      <div className={style.header__container}>
        <div className={style.logo__container}>
          {/* logo */}
          <Link to={"/"}>
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </Link>
          {/* delivery */}
          <div className={style.delivery}>
            <span>
              <SlLocationPin />
            </span>
          </div>
          <div>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
        </div>
        <div className={style.search}>
          {/* search */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="search product" />
          <BsSearch size={38} />
        </div>
        {/* right side link */}
        <div className={style.order__container}>
          <a href="" className={style.language}>
            <img
              src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
              alt="USA flage"
            />

            <select name="" id="">
              <option value="">ENG</option>
            </select>
          </a>

          {/* three components */}

          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                <p>Hello, Sign in</p>
                <span>Account & List</span>
                </>
              )}
            </div>
          </Link>

          {/* order*/}
          <Link to="/orders">
            <p>returns</p>
            <span>& Orders</span>
          </Link>
          {/* cart */}
          <Link to="/cart" className={style.cart}>
            <BiCart size={29} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
