import React from 'react'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useState } from 'react'
import axiosinstance from '../config/axios.js'
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhonenumber] = useState("");
    const [error, setError] = useState("");

    function submission(e) {
        e.preventDefault();
        
        axiosinstance.post("/user/signup", { email, password, phoneNumber})
            .then((res) => {
                
                if(res.data.message != "Invalid details") {
                    navigate("/");
                    console.log("signup successful");
                    console.log(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    console.log("token saved");
                }
                else console.log("invalid details");
            })
            .catch((err) => {
                console.log("user already exists");
                setError("");
            });
    }

    useEffect(function () {
        gsap.to('.box', { duration: 1, stagger: 0.09, y: 100, opacity: 1, scale: 1, ease: "bounce.out" });

    }, []);

    return (
        <div className='h-[100vh] w-[100vw] bg-[#1E1E1E] flex justify-center items-center flex-col'>
            <div className=' mb- text-[600%] text-white mb-25'>
                <h1 className='box inline-block'>L</h1>
                <h1 className='box inline-block'>&</h1>
                <h1 className=' box inline-block'>F</h1>
            </div>
            <div className='flex flex-col justify-center items-center border-2 border-white rounded-lg p-4 h-100 w-80'>
                <h1 className='text-4xl text-white'>Signup</h1>
                <form className='flex flex-col mt-4 h-50 w-60'>
                    <input type="email" placeholder="email" className='mb-2 p-2 rounded bg-white ' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder="password" className='mb-2 p-2 rounded bg-white' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="tel" placeholder="phonenumber" className='mb-2 p-2 rounded bg-white' value={phoneNumber} onChange={(e) => { setPhonenumber(e.target.value) }} />
                    <button type="submit" className='bg-blue-500 text-white p-2 rounded' onClick={submission}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;