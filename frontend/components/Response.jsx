import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../homecomponents/Navbar";
import axiosinstance from '../config/axios';
import { usercontext } from '../src/Userprovider';
import { useNavigate } from 'react-router-dom';
import Scrollbar from '../homecomponents/Scrollbar';

// Convert buffer to base64 string
function bufferToBase64(buffer) {
    return btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}

const Response = () => {
    const { attr, setAttr } = useContext(usercontext);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState("");
    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        axiosinstance.get('/response')
            .then((res) => {
                if (res.data.status) {
                    setUserDetails(res.data.email);
                    setLostItems(res.data.data.yourLostItems);
                    setFoundItems(res.data.data.yourFoundItems);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='myresponse z-[100] flex flex-col min-h-screen w-full bg-[#012F49] text-white overflow-x-hidden'>
            <Navbar />
            {/* <Scrollbar/> */}
            <h1 className='text-4xl m-4 mt-7 ml-7'>Hello {userDetails.split('@')[0]}</h1>

            {/* Lost Items Section */}
            <div className='flex flex-col gap-4 m-4 w-full'>
                <h1 className='text-4xl font-bold text-center text-white my-6 border-b border-gray-400 pb-2'>
                    Lost Items
                </h1>

                {lostItems.length === 0 ? (
                    <p className="text-xl text-center text-gray-300">No lost items found.</p>
                ) : (
                    lostItems.map((item) => (
                        <div
                            key={item._id}
                            className="w-full max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 mt-6 bg-[#013b5c] rounded-2xl shadow-2xl hover:shadow-blue-600 transition duration-300"
                            onClick={() => {
                                setAttr("lostitem");
                                setId(item._id);
                                navigate(`/project/${item._id}`);
                            }}
                        >
                            {/* Image */}
                            <div className="flex justify-center items-center">
                                <img
                                    src={`data:${item.image.contentType};base64,${bufferToBase64(item.image.data.data)}`}
                                    alt={item.name}
                                    className="rounded-xl max-h-[300px] object-contain shadow-md"
                                    onError={(e) => (e.target.style.display = 'none')}
                                />
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-lg">
                                <h1 className="text-3xl font-bold">{item.name}</h1>
                                <p><strong>Brand:</strong> {item.brand}</p>
                                <p><strong>Color:</strong> {item.color}</p>
                                <p><strong>Serial No:</strong> {item.serialnumber}</p>
                                <p><strong>Question:</strong> {item.question}</p>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Location:</strong> {item.location}</p>
                                <p><strong>Lost on:</strong> {new Date(item.date).toLocaleDateString()}</p>

                                <div className="flex gap-4 mt-4">
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
                                        Claim Item
                                    </button>
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
                                        Contact Finder
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Found Items Section */}
            <div className='flex flex-col gap-4 m-4 w-full'>
                <h1 className='text-4xl font-bold text-center text-white my-6 border-b border-gray-400 pb-2'>
                    Found Items
                </h1>

                {foundItems.length === 0 ? (
                    <p className="text-xl text-center text-gray-300">No found items reported.</p>
                ) : (
                    foundItems.map((item) => (
                        <div
                            key={item._id}
                            className="w-full max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 mt-6 bg-[#013b5c] rounded-2xl shadow-2xl hover:shadow-blue-600 transition duration-300"
                            onClick={() => {
                                setAttr("founditem");
                                setId(item._id);
                                navigate(`/project/${item._id}`);
                            }}
                        >
                            {/* Image */}
                            <div className="flex justify-center items-center">
                                <img
                                    src={`data:${item.image.contentType};base64,${bufferToBase64(item.image.data.data)}`}
                                    alt={item.name}
                                    className="rounded-xl max-h-[300px] object-contain shadow-md"
                                    onError={(e) => (e.target.style.display = 'none')}
                                />
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-lg">
                                <h1 className="text-3xl font-bold">{item.name}</h1>
                                <p><strong>Brand:</strong> {item.brand}</p>
                                <p><strong>Color:</strong> {item.color}</p>
                                <p><strong>Serial No:</strong> {item.serialnumber}</p>
                                <p><strong>Question:</strong> {item.question}</p>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Location:</strong> {item.location}</p>
                                <p><strong>Lost on:</strong> {new Date(item.date).toLocaleDateString()}</p>

                                <div className="flex gap-4 mt-4">
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
                                        Claim Item
                                    </button>
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
                                        Contact Finder
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Response;
