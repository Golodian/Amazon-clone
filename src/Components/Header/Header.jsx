import React from "react";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import style from "./Header.module.css";

function Header() {
  return (
    <section>
      <div className={style.header__container}>
        <div className={style.logo__container}>
          {/* logo */}
          <a href="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </a>
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
          <BsSearch size={25} />
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

          <a href="">
            <div>
              <p>Sign In</p>
              <span>Account & Lists</span>
            </div>
          </a>

          {/* order*/}
          <a href="">
            <p>returns</p>
            <span>& Orders</span>
          </a>
          {/* cart */}
          <a href="" className={style.cart}>
            <BiCart size={29} />
            <span>0</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
