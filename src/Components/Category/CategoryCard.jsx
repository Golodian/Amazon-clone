import React from "react";
import styles from "./Category.module.css";
import {Link}  from "react-router-dom"
function CategoryCard({ data }) {
  return (
    <>
      <div className={styles.category}>
        <Link to={`category/${data.name}`}>
          <h2>{data.title}</h2>
          <img src={data.imgLink} alt="" />
          <p>shope now</p>
        </Link>
      </div>
    </>
  );
}

export default CategoryCard;

// import React from 'react';
// import styles from './Category.module.css'
// import { Link } from 'react-router-dom';
// const CategoryCard = ({data}) => {
//   return (
//     <div className={`${styles.category_card} `}>

//       <Link to= {/category/${data.name}} className= " ">
//         <span>
//           <h2 className={${styles.title}}>{data.title}</h2>
//         </span>
//         <img src={data.imgLink} alt={data.title} className=''/>
//         <p className=" ">Shop now</p>
//       </Link>
//     </div>
//   );
// };

// export default CategoryCard;
