import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError,handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData]= useState({
    name:'',
    email:'',
    password:''
  })

  const handlechange =(e)=>{
    const {name,value}=e.target;
    console.log(name,value);

    const copy = {...data};
    copy[name]=value;
    setData(copy)
  }

    
   const navigate=useNavigate()


//  const handlesingup = async (e)=>
//   {
//   e.preventDefault();
//   const {name,email, password}=data;


//     if(!name || !email || !password){
//     return handleError("name ans email and password is worig")
//    }

//    try {
//     const URL = `http://localhost:4000/auth/singup`
//       const response=await fetch(URL,{
//         method:"POST",
//         headers:{
//           "content-type":"aplication/json"

//         },
//         body:JSON.stringify(data)
        
//       });
//       const result=await response.JSON()
//       console.log(result)
      
//     } catch (error) {
//       handleError(error)
      
//     }
   
// }

  const handlesingup = async (e) => {
      e.preventDefault();
      const { name, email, password } = data;
      if (!name || !email || !password) {
        return handleError("name, email and password are required");
      }
      try {
        const url = `http://localhost:4000/auth/singup`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
          toast.success(message);
          setTimeout(() => {
            navigate("/login");
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


  console.log(data)
  return (
    <div className="container">
      <form onSubmit={handlesingup}>
        <label>
          name:
          <input
            type="text"
            name="name"
            placeholder="enter the  ...."
            onChange={handlechange}
            value={data.name}
          />
        </label>
        <br />

        <label>
          password:
          <input
            type="password"
            name="password"
            placeholder="enter the data ...."
            onChange={handlechange}
            value={data.password}
          />
        </label>
        <br />

        <label>
          email:
          <input
            type="email"
            name="email"
            placeholder="enter the data ...."
            onChange={handlechange}
            value={data.email}
          />
        </label>
        <br />

        <button type="submit">Register</button>
        <span className="bg-red-950">
          have a not accout ?<Link to="/Login">login</Link>
        </span>
        <ToastContainer></ToastContainer>
      </form>
    </div>
  );
}

export default Register;
