import React, { useState, useContext } from "react";
import style from "./SignUp.module.css";
import { Link, useNavigate, useLocation} from "react-router-dom";
import {auth} from "../../Utility/firebase"

import { Type } from "../../Utility/action.type"; // Ensure Type is imported properl
import {signInWithEmailAndPassword,createUserWithEmailAndPassword,} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //console.log(password, email);
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext); //creating context to use the dispatch and the satte after getting the user info
  //console.log(user);

  const navigate = useNavigate(); // import and use navigate to use it the customer navigat to home page after sign in or sign up
  const navStateData = useLocation(); //special hook we use it to redirect the path

  console.log(navStateData);
  const [loading, setLoading] = useState({
    // creating initial state of loader(spinner) for sign in and sign up

    signin: false,
    signup: false,
  });
  // creating afunction for sign in and sign up

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name == "signin") {
      //if user clicked on the signin button we use the sign in  method to get authentication it is the promis so we use (.then)
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    } else {
      //if user clicked on the signup button we use the creatuser method to get authentication it is the promis so we use (.then)
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);

          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signup: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signup: false });
        });
    }
  };
  //  console.log(password, email);

  return (
    <section className={style.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      {/* form */}
      <div className={style.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={style.login_signinButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              " Sign In"
            )}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* creat account btn */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={style.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Creat your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth













// import React, { useState, useContext } from "react";
// import style from "./SignUp.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../../Utility/firebase";
// import { Type } from "../../Utility/action.type";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { ClipLoader } from "react-spinners";
// import { DataContext } from "../../Components/DataProvider/DataProvider";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [{ user }, dispatch] = useContext(DataContext);
//   const navigate = useNavigate();

//   const handleAuth = async (action) => {
//     setLoading(true);

//     try {
//       const userInfo =
//         action === "signin"
//           ? await signInWithEmailAndPassword(auth, email, password)
//           : await createUserWithEmailAndPassword(auth, email, password);

//       dispatch({ type: Type.SET_USER, user: userInfo.user });
//       navigate("/");
//     } catch (err) {
//       setError(
//         err.code === "auth/email-already-in-use"
//           ? "This email is already registered. Please sign in."
//           : err.code === "auth/invalid-email"
//           ? "Invalid email address."
//           : err.code === "auth/wrong-password"
//           ? "Incorrect password."
//           : err.code === "auth/user-not-found"
//           ? "No account found with this email."
//           : err.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const authHandler = async (e) => {
//     e.preventDefault();
//     const action = e.target.name;
//     await handleAuth(action);
//   };

//   return (
//     <section className={style.login}>
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt="Amazon Logo"
//         />
//       </Link>

//       <div className={style.login_container}>
//         <h1>Sign In</h1>
//         <form onSubmit={authHandler}>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               id="email"
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//             />
//           </div>
//           <button
//             type="submit"
//             name="signin"
//             className={style.login_signinButton}
//             aria-label="Sign In"
//           >
//             {loading ? <ClipLoader color="#000" size={15} /> : "Sign In"}
//           </button>
//         </form>

//         <p>
//           By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
//           Sale. Please see our Privacy Notice, our Cookies Notice and our
//           Interest-Based Ads Notice.
//         </p>

//         <button
//           type="submit"
//           name="signup"
//           onClick={authHandler}
//           className={style.login_registerButton}
//           aria-label="Create Account"
//         >
//           {loading ? (
//             <ClipLoader color="#000" size={15} />
//           ) : (
//             "Create your Amazon Account"
//           )}
//         </button>

//         {error && (
//           <small style={{ paddingTop: "5px", color: "red" }} aria-live="polite">
//             {error}
//           </small>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Auth;