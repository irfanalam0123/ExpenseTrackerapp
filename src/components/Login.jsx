import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError ,handleSuccess} from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [loginInfo, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange =(e)=>{
    const {name,value}=e.target;
    console.log(name,value);

    const copy = {...loginInfo};
    copy[name]=value;
    setData(copy)
  }
  console.log(loginInfo);

  
  // const handdlelogin= async (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   if ( !email || !password) {
  //     return handleError("name, email and password are required");
  //   }
  //   try {
  //     const url = `http://localhost:4000/auth/login`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //     const { success, message,jwtToken,name, error } = result;
  //     if (success) {
  //       toast.success(message);
  //       localStorage.setItem('token', jwtToken)
  //       localStorage.setItem('loggedUser',name)

  //       setTimeout(() => {
  //         navigate("/singup");
  //       }, 1000);
  //     } else if (error) {
  //       const details = error?.details[0].message;
  //       handleError(details);
  //     } else if (!success) {
  //       handleError(message);
  //     }
  //     console.log(result);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = `http://localhost:4000/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handlelogin}>
        <label>
          email:
          <input
            type="email"
            name="email"
            placeholder="enter the  ...."
            value={loginInfo.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          password:
          <input
            type="password"
            name="password"
            placeholder="enter the data ...."
            value={loginInfo.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">login</button>
        <br />
        <span>
          have a not accout ?<Link to="/Register">Register</Link>
        </span>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Login;
