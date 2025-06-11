import React, { createContext, useState, useEffect } from 'react';

const usercontext = createContext();

const Userprovider = ({ children }) => {
  const [enable, setEnable] = useState(() => JSON.parse(localStorage.getItem('enable')) || false);
  const [item, setItem] = useState(() => localStorage.getItem('item') || "");
  const [item2, setItem2] = useState(() => JSON.parse(localStorage.getItem('item2')) || false);
  const [email, setEmail] = useState(() => localStorage.getItem('email') || "");
  const [attr, setAttr] = useState(() => localStorage.getItem('attr') || "");
  const [myid, setMyid] = useState(() => localStorage.getItem('myid') || "");

  const [img, setImg] = useState(() => {
  const stored = localStorage.getItem('img');
  return stored ? JSON.parse(stored) : { data: "", contentType: "" };
});

  
  const [array, setArray] = useState(() => {
    const stored = localStorage.getItem('array');
    return stored ? JSON.parse(stored) : [];
  });

  const [itemdetails, setItemdetails] = useState(() => {
    const stored = localStorage.getItem('itemdetails');
    return stored
      ? JSON.parse(stored)
      : {
          itemid: "",
          brand: "",
          color: "",
          date: "",
          description: "",
          location: "",
          name: "",
          question: "",
          serialnumber: "",
          userid: ""
        };
  });

  useEffect(() => {
    localStorage.setItem('enable', JSON.stringify(enable));
  }, [enable]);

  useEffect(() => {
    localStorage.setItem('item', item);
  }, [item]);

  useEffect(() => {
    localStorage.setItem('item2', JSON.stringify(item2));
  }, [item2]);

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('attr', attr);
  }, [attr]);

  useEffect(() => {
    localStorage.setItem('myid', myid);
  }, [myid]);

 useEffect(() => {
  localStorage.setItem('img', JSON.stringify(img));
}, [img]);

  useEffect(() => {
    localStorage.setItem('itemdetails', JSON.stringify(itemdetails));
  }, [itemdetails]);

  useEffect(() => {
    localStorage.setItem('array', JSON.stringify(array));
  }, [array]);

  return (
    <usercontext.Provider
      value={{
        enable, setEnable,
        item, setItem,
        item2, setItem2,
        email, setEmail,
        attr, setAttr,
        itemdetails, setItemdetails,
        myid, setMyid,
        array, setArray,
        img, setImg
      }}
    >
      {children}
    </usercontext.Provider>
  );
};

export default Userprovider;
export { usercontext };
