import React, { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { usercontext } from '../src/Userprovider'
import { gsap } from 'gsap';
import LostItemForm from './LostItemForm'
import FoundItemForm from './FoundItemForm'
import Scrollbar from './Scrollbar'
const PostItem = () => {

    const { enable, setEnable,item,setItem } = useContext(usercontext);
   
    useEffect(() => {
        gsap.from(".box", {
            y: -500,
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: "ease-in-out",
        })
    }, [enable])


    

    


    return (
        <div className='m-2  text-xl  '>
            {<button className='transition duration-300 ease-in-out hover:shadow-2xl hover:scale-120 ' onClick={() => { setEnable((prev) => { return !prev }) }}>postItem</button>}
            {enable && <div className={`box mt-9 fixed z-[100]  bg-[#E8E1B5]  w-[35vw] left-50 translate-x-[50%] rounded-4xl backdrop-blur-md flex flex-col  `}>
                <div className=' flex flex-row justify-around  text-[#012F49]'>
                    <h1 className={`foundItem  w-[50%] text-center  ${"foundItem"===item &&"border-b-2 shadow-r"} `} onClick={() => { setItem("foundItem") }} >foundItem</h1>
                    <h1 className={`lostItem  w-[50%] text-center   ${"lostItem"===item &&"border-b-2 shadow-r" }  `} onClick={() => { setItem("lostItem") }} >lostItem</h1>
                </div>
                {item === "lostItem" && <LostItemForm/>}
                {item === "foundItem" && <FoundItemForm/>}
                

            </div>}

        </div>
    )
}

export default PostItem