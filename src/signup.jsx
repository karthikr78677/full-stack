import React from 'react';
import { FaRegCopy } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { LuCopyCheck } from "react-icons/lu";
import Axios from "axios"
import {useNavigate,Link} from "react-router-dom"
const SignUp = () => {
  const navigate=useNavigate();
  const [firstName,setFirstName]=React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [phno, setPhno] = React.useState('');
  const [error,setError]= React.useState("");
  const [strongPassword, setStrongPassword] = React.useState('');
    const [copied,setCopied] = React.useState(false);
  const [copy,setCopy] = React.useState(true);
  const [fillStrongPassword, setFillStrongPassword] = React.useState(false);
  const [useStrongPassword, setUseStrongPassword] = React.useState(true);
  const [removeStrongPassword, setRemoveStrongPassword] = React.useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = React.useState(false);
   React.useEffect(() => {
    generatePassword();
  }, []);



  function generatePassword(){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;'\"<>,.?/~`";
  let generatedPassword = "";
  for(let i=0; i<=7; i++){
    let value = Math.floor(Math.random() * chars.length);
    generatedPassword += chars[value];
    
  }
  


  setStrongPassword(generatedPassword);
  }
  


  function validatePassword(password, confirmPassword) {
  const isStrongPassword = 
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isMatching = password === confirmPassword;

  
  setError(!isStrongPassword);
  setPasswordNotMatch(!isMatching);

  return isStrongPassword && isMatching;
}

    

  function handleSubmit(e){
    e.preventDefault();
    const formData={
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      phno: phno
    }
  
       const isValid = validatePassword(password, confirmPassword);
       

  if (isValid) {
    // fetch("http://localhost:3001/signup",{
    //     method:"POST",
    //     headers:{
    //       "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify(formData)
    //    })
    //    .then((res)=>res.json())
    //    .then((data)=>{
    //     if(data){
    //       alert(data.message);
    //       console.log(data)
    //     }
    //     else{
    //       alert("register failed");
    //     }
    //    })
    //    .catch((err)=>{
    //     console.error("Error:", err);
    //     alert("An error occurred while registering. Please try again.");
    //    })

    
      async function postData(){
        try{
          const response=await Axios.post("https://full-stack-1-md7o.onrender.com/signup",formData);
          if(response){
            alert(response.data.message)
          }
          else{
            alert("register failed");
          }
        }
        catch(err){
          console.error("Error:", err);
          alert("An error occurred while registering. Please try again.");
        }
      } 
      postData();
    

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhno("");
    navigate("/");
  } else {
    setPassword("");
    setConfirmPassword("");
  }
       



  }
  function handleCopy(){
    navigator.clipboard.writeText(generatePassword());
    setCopy(prev=>!prev);
    
    setTimeout(() => {
      setCopy((prev)=>!prev);
      setCopied(prev=>!prev);
    }, 2000);
    
    setCopied(prev=>!prev);
  }


  function handleRefresh(){
    generatePassword(); 
  }



  function UseStrongPassword(){
    setFillStrongPassword(true);
    setRemoveStrongPassword(true);
    setUseStrongPassword(false);
    setPassword(strongPassword);
  setConfirmPassword(strongPassword);

  }



function RemoveStrongPassword(){
  setUseStrongPassword(true);
  setFillStrongPassword(false);
  setRemoveStrongPassword(false);
  setPassword("");
  setConfirmPassword("");

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center mb-6">Create Your Account</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)} required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)} required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className='flex justify-between '>
            <h3 className='flex justify-center text-0.8xl'>Strong Password</h3>
            { useStrongPassword &&<button className='mr-12  border border-blue-500 text-white bg-blue-600  w-40 rounded-md' onClick={UseStrongPassword}>Use Password</button>}
            {removeStrongPassword && <button className='mr-12  border border-blue-500 text-white bg-blue-600  w-40 rounded-md' onClick={RemoveStrongPassword}>Remove Password</button>}
          </div>
          
          <div className='flex  items-center bg-gray-200 p-2 rounded-md w-full'>
            <div className='flex items-center justify-between w-70%'>
              <h4 className='flex mx-20'>{strongPassword}</h4>
              {copy &&<FaRegCopy className='size-6' onClick={handleCopy} />}
              {copied &&<LuCopyCheck className='size-6'/>}
              </div>
            <div className='flex items-center justify-center cursor-pointer w-30%'>
              <FiRefreshCcw className='mx-12 size-6' onClick={handleRefresh} />
            </div>
            
            </div>
            {error && <div className='text-red-500 '>
              password must contain 8 characters, one upper case, one special symbol like "!@#$%^&amp;*(),.?":{'{}'}|  &lt; &gt;" or password not match
            </div>}

            {passwordNotMatch &&<div>
              passwords not match
              </div>}

            <input
            type="password"
            placeholder="Password"
            value={ password}
            onChange={(e)=>setPassword(e.target.value)} required
           className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={ confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)} required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phno}
            onChange={(e)=>setPhno(e.target.value)} required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
           <div className="text-center mt-4 text-sm text-gray-600">
                      <span>Already SignUp? </span>
                      <Link to="/signin" className="text-blue-600 hover:underline">
                        Sign In
                      </Link>
                    </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
