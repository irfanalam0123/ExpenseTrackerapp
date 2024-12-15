import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess, APIUrl } from "../utils";
import {useNavigate} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Expansestabel from './Expansestabel';
import Expansesform from './Expansesform';
import Expansesdetails from './Expansesdetails';


const Home = () =>{

  const [loggedInUser, setLogged] = useState("");
  const [expanses,setExpanses]=useState([])
   const [incomeAmt, setIncomeAmt] = useState(0);
   const [expenseAmt, setExpenseAmt] = useState(0);


  const navigate = useNavigate()

  useEffect (() =>{
    setLogged(localStorage.getItem("loggedInUser"));
  },[])






  const handleLogout= (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggeduser");

    handleSuccess("loggout the user");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

 







  // useEffect(() => {
  //   const amounts = expanses.map((item) => item.amount);
  //   const income = amounts
  //     .filter((item) => item > 0)
  //     .reduce((acc, item) => (acc += item), 0);
  //   const exp =
  //     amounts
  //       .filter((item) => item < 0)
  //       .reduce((acc, item) => (acc += item), 0) * -1;
  //   setIncomeAmt(income);
  //   setExpenseAmt(exp);
  // }, [expanses]);





 const fetchExpenses = async () => {
   try {
     const url = `${APIUrl}/expenses`;
     const headers = {
       headers: {
         Authorization: localStorage.getItem("token"),
       },
       
     };
     const response = await fetch(url, headers);
     if (response.status === 403) {
       localStorage.removeItem("token");
       navigate("/login");
       return;
     }
     const result = await response.json();
     console.log("--result", result.data);
     setExpanses(result.data);
   } catch (err) {
     handleError(err);
   }
 };





const deleteExpens = async (id) => {
  try {
    const url = `${APIUrl}/expenses/${id}`;
    const headers = {
      headers: {
       'Authorization': localStorage.getItem("token"),
      },
      method: "DELETE",
    };
    const response = await fetch(url, headers);
    if (response.status === 403) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }
    const result = await response.json();
    handleSuccess(result?.message);
    console.log("--result", result.data);
    setExpanses(result.data);
  } catch (err) {
    handleError(err);
  }
};
   




    const addTransaction = async (data) => {
      try {
        const url = `${APIUrl}/expenses`;
      const response = await fetch(url, {
        method: "POST",
          body: JSON.stringify(data),
        headers: { 
          'Authorization': localStorage.getItem(
            'token'
          ),
          "Content-Type": "application/json",
        },
      }
    )



        
        
        if (response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const result = await response.json();
        handleSuccess(result?.message);
        console.log("--result", result.data);
        setExpanses(result.data);
      } catch (err) {
        handleError(err);
      }
    }; 
 

 




  useEffect( () =>{
    fetchExpenses()
  },[])

  

  return (
    <div>
      <div>
        <h1>welcome  : {loggedInUser} </h1>
        <button onClick={handleLogout}> logout</button>
      </div>

      <Expansesdetails
       incomeAmt={incomeAmt}
        expenseAmt={expenseAmt} 
       />
      <Expansesform 
       addTransaction={addTransaction} 
       />
      <Expansestabel
       expenses={expanses} 
       deleteExpens={deleteExpens} 
       />

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Home;
