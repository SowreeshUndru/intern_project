import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../homecomponents/Navbar';
import axiosinstance from '../config/axios';
import { useContext } from 'react';
import { usercontext } from '../src/Userprovider';
import { useNavigate } from 'react-router-dom';

function bufferToBase64(buffer) {
  return btoa(
    new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}


const LostItemDetails = () => {
  const navigate=useNavigate();
  const { attr, setAttr, itemdetails, setItemdetails } = useContext(usercontext);
  const [isfound, setIsfound] = useState(false);
  const [iscontact, setIscontact] = useState(false);
  const [isclaim, setIsclaim] = useState(false);
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {


    const fetchItem = async () => {
      try {
        const response = await axiosinstance.get(`/item/${id}`, { params: { message: attr } });
        console.log(response.data.item);
        setItem(response.data.item);
        const {
          
          brand,
          color,
          date,
          description,
          location,
          name,
          question,
          serialnumber,
          userid
        } = response.data.item
        const itemid=id;
        setItemdetails({
          itemid,
          brand,
          color,
          date,
          description,
          location,
          name,
          question,
          serialnumber,
          userid
        })
        console.log(itemdetails);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);



  if (!item) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="bg-[#012F49] min-h-screen w-full text-white overflow-x-hidden">
      <Navbar />
      {/*  */}




      {iscontact && <div className='z-999 fixed left-[65%] -translate-x-[50%] top-[80%] flex   gap-3 items-center  w-100 h-10 rounded-full    '>
        <button className='rounded-full w-fit h-fit p-2 bg-[#299A0B] ml-5 hover:bg-[#299A0B]/70' >phoneNumber</button>
        <button className='rounded-full w-fit h-fit p-2 bg-[#299A0B] hover:bg-[#299A0B]/70 ' onClick={()=>{navigate("/chat/1")}}>chatWithUser</button>
      </div>}





      {/*  */}
      <h1 className='w-full text-4xl text-center m-3'>{`${attr.split('i')[0]} i${attr.split('i')[1]}`}</h1>
      <div className=" relative bottom-2 max-w-6xl h-150 mb-3 mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 bg-[#013b5c] rounded-xl shadow-xl">

        {/* Image Placeholder */}
        <div className="flex justify-center items-center">
          {/* You can use actual image once ready */}
          <img
            src={`data:${item.image.contentType};base64,${bufferToBase64(item.image.data.data)}`}
            alt={item.name}
            className="rounded-xl max-h-[400px] object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p><span className="font-semibold">Brand:</span> {item.brand}</p>
          <p><span className="font-semibold">Color:</span> {item.color}</p>
          <p><span className="font-semibold">Serial No:</span> {item.serialnumber}</p>
          <p><span className="font-semibold">Question:</span> {item.question}</p>
          <p><span className="font-semibold">Description:</span> {item.description}</p>
          <p><span className="font-semibold">Location:</span> {item.location}</p>
          <p><span className="font-semibold">{`${attr.split('i')[0]} on :`}</span> {new Date(item.date).toLocaleDateString()}</p>

          <div className="flex gap-4 mt-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold shadow-lg" onClick={() => { alert("are u sure!!"); setIsfound(!isfound) }}>
              {attr === "founditem" ? "Claim" : "Found"}
            </button>
            {(isfound || isclaim) && <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold shadow-lg" onClick={() => setIscontact(!iscontact)}>
              Contact Finder
            </button>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LostItemDetails;
