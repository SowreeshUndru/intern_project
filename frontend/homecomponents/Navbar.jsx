import React from 'react'
import PostItem from './PostItem'
import { usercontext } from '../src/Userprovider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axiosinstance from '../config/axios.js'


// logout we have to do here remaining 
const Navbar = () => {
    const navigate = useNavigate();
    async function signout() {
        try {
            await axiosinstance.get("/user/logout").then((res) => {
                console.log(res.data);
                if(res.status==200){
                    //localStorage.setItem("token","");
                    navigate("/login");
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    
    const location = useLocation();
    const roomid = location && location.state && location.state.roomid ? location.state.roomid : "";

    const { item2, setItem2, array, setArray } = useContext(usercontext);
    const [notify, setNotify] = useState(false);
    return (
        <div className=' overflow-x-hidden z-[999]  bg-[#E8E1B5]/30   flex sm:flex-col md:flex-row w-full justify-between p-2 '>


            <div className='flex flex-row justify-center items-center m-2 mr-150 '>
                <h1 className='text-3xl text-white  '>L&F</h1>
            </div>



            <PostItem />


            <div className="text-xl  m-2 transition duration-300 ease-in-out hover:shadow-2xl hover:scale-120" onClick={() => { navigate('/response') }}>
                <h1>myResponses</h1>
            </div>

            <div className="text-xl m-2 transition duration-300 ease-in-out hover:shadow-2xl hover:scale-120 " onClick={() => {
                setItem2(!item2)
            }}>
                <h1>yourProfile</h1>
            </div>

            <div className='relative transition duration-300 ease-in-out hover:shadow-2xl shadow-blue-200 rounded-full hover:scale-120  ' onClick={() => { setNotify(() => { return !notify }) }}>
                {array.length !== 0 && (<div className='absolute right-0 h-2 w-2 rounded-full bg-[#DC3545]'></div>)}
                <h1 className='m-2 text-xl cursor-pointer'>notifications</h1>


                {/*  */}


            </div>
            {(array.length != 0 && notify) && (<div className='fixed z-[999]  w-[15vw] bg-[#754C24]/30 backdrop-blur-md rounded-xl right-25
             hover:scale-105 hover:shadow-md hover:shadow-blue-600  transition duration-300 ease-in-out
             top-15 text-center cursor-pointer p-1 flex flex-col gap-1 '>






                {array.map(function (item, index) {
                    return (<div key={index} className=' z-[999]   bg-[#754C24]/30 backdrop-blur-md rounded-xl   text-center cursor-pointer p-1 ' onClick={() => { navigate(`/chat/${item}`) }}>
                        <h1>{item[item.length - 1] === '*' ? `somebody is matched with your items ` : `${index + 1} user waiting for u`}</h1>
                    </div>);
                })}




            </div>)}


            {/*  */}


            <div className='m-2 text-xl transition duration-300 ease-in-out hover:shadow-2xl hover:scale-120' onClick={() => { signout() }}>
                <h1 className=" text-[#DC3545]" >signOut</h1>
            </div>


        </div>
    )
}

export default Navbar