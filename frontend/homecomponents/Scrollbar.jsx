import React, { useEffect, useRef, useContext, useState } from 'react';
import gsap from 'gsap';
import { usercontext } from '../src/Userprovider';
import { useNavigate } from 'react-router-dom';
import axiosinstance from "../config/axios.js";

function bufferToBase64(buffer) {
  return btoa(
    new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}



const Scrollbar = () => {
  const navigate = useNavigate();
  const { item2, email, img, setImg } = useContext(usercontext);
  const tl = useRef(null);
  const [profile, setProfile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  //console.log(img);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current.to('.scrollitem', {
      x: -450,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, []);

  useEffect(() => {
    if (tl.current) {
      if (item2) {
        gsap.from(".bar > *", {
          x: 140,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.inOut',
        });
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [item2]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    axiosinstance.post('/user/upload-profile',
      formData
    )

      .then(data => {
        alert('Profile uploaded successfully!');
        setProfile(false);
      })
      .catch(err => {
        console.error('Upload failed:', err);
        alert('Failed to upload profile picture');
      });
  };

  return (
    <div className='scrollitem relative flex flex-col flex-1 w-[30vw] bg-[#77C2BC]/70 text-white left-[100vw] opacity-0 overflow-x-hidden'>

      <div className='bar flex flex-col justify-center items-center m-10 gap-13'>
        <div className='flex gap-4 items-center'>
          <div className='rounded-full bg-white h-20 w-20'>
            {/* profilepic */}
            {img?.data && (
              <img
               src={`data:${img.contentType};base64,${bufferToBase64(img.data.data)}`}
               className='object-fit h-full w-full rounded-full'
              />
            )}
            {/* prfoilepic */}
          </div>
          <h1 className='text-3xl'>{email.split('@')[0]}</h1>
        </div>

        <h1 className="text-3xl cursor-pointer" onClick={() => setProfile(!profile)}>
          Upload Profile Pic
        </h1>

        <h1 className='text-3xl'>myCommunity</h1>
        <h1 className='text-3xl cursor-pointer' onClick={() => navigate("/chat/2")}>
          liveChat
        </h1>
        <h1 className='text-3xl cursor-pointer' onClick={() => navigate("/listings")}>
          listings
        </h1>
        <h1 className='text-3xl'>rateUs</h1>
      </div>

      {profile && (
        <div className='fixed top-0 left-0 w-full h-full bg-[#012F49]/30 backdrop-blur-md z-[999] flex flex-col items-center justify-center p-4'>

          {/* Close Button */}
          <div
            className='absolute top-4 right-5 h-6 w-6 cursor-pointer z-[1001]'
            onClick={() => setProfile(false)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=feuKSvqNnsys&format=png&color=000000"
              alt="Close"
              className='w-full h-full'
            />
          </div>

          <label htmlFor="profilePic" className='p-2 text-white text-lg'>
            Upload Profile:
          </label>

          <input
            type="file"
            id="profilePic"
            name="image"
            accept="image/*"
            className='bg-white/30 rounded-md px-3 py-1 mb-3 text-white'
            onChange={handleFileChange}
          />

          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
          )}

          <button
            onClick={handleSubmit}
            className='bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded'
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Scrollbar;
