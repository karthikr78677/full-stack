import React from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    function HandleSignIn(e){
        e.preventDefault();
        const formData={
            Email: email,
            Password: password
        }
        async function FormData(){
            try{
                const response=await Axios.post("https://full-stack-1-md7o.onrender.com/signin",formData);
                if(response){
                    if(response.data.success){
                        alert(response.data.message);
                        // Redirect to home page or dashboard after successful sign-in
                        navigate("/");
                    }
                    else{
                        // If the sign-in was not successful, show the error message
                        alert(response.data.message);
                    }
                    
                }
                else{
                    alert("Sign in failed");
                }
            }
            catch(err){
                console.error("Error:", err);
                alert("An error occurred while signing in. Please try again.");
            }
        }
        FormData();
        setEmail("");
        setPassword("");
       


    }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md bg-white">
        
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form className="flex flex-col gap-4" onSubmit={HandleSignIn}>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={email}
              onChange={((e) => setEmail(e.target.value))} 
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={password}
                onChange={((e) => setPassword(e.target.value))}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <div className="text-center mt-4 text-sm text-gray-600">
            <span>New user? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
