import { useState, createContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;


export const Dbox = createContext(null);



export function FunPovider ( { children }) {
  
  
  
  const login = async () => {
    try {
      const res = await axios.post(`${baseUrl}/v2/admin/signin`, {username: 'dog@gmail.com', password: '999888'});
      
      if (res.data.success) {
        
        const { token, expired } = res.data;
        
        document.cookie = `dogfood=${token}; expires=${new Date(expired)}`;
      }
      
      getProducts();
    } catch (err) {
      console.log(err);
    }
  }
  
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/admin/products`);
      
      setProducts(res.data.products);

      getCart();
      
      setPlay(null);
    } catch (err) {
      console.log(err);
    }
  };


  const [detail, setDetail] = useState({});


  const [inputKey, setInputKey] = useState(1);
  
  
  
  const addCart = async (id, qty) => {
    setPlay(id);
    try {
      await axios.post(`${baseUrl}/v2/api/${apiPath}/cart`, {
        data: {
          product_id: id,
          qty: Number(qty)
        }
      });

      await getCart();

      setPlay(null);
    } catch (err) {
      console.log(err);
    }
  }



  const [carts, setCarts] = useState([]);



  const getCart = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/cart`);
      
      setCarts(res.data.data.carts);
    } catch (err) {
      console.log(err);
    }
  };




  const zeroCart = async () => {
    setPlay('screen');

    try {
      await axios.delete(`${baseUrl}/v2/api/${apiPath}/carts`);

      await getCart();

      setPlay(null);
    } catch (err) {
      console.log(err);
    }
  };







  const OGTotal = () => {
    return carts.reduce((total, cart) => total + (cart.product.origin_price * cart.qty), 0);
  };





  const DCTotal = () => {
    return carts.reduce((total, cart) => total + cart.total, 0);
  };



  const delItem = async (id) => {
    setPlay('screen');

    try {
      await axios.delete(`${baseUrl}/v2/api/${apiPath}/cart/${id}`);
      
      await getCart();

      setPlay(null);
    } catch (err) {
      console.log(err);
    }
  };





  const editItem = async (itemId, productId, itemQty) => {
    setPlay('screen');

    try {
      await axios.put(`${baseUrl}/v2/api/${apiPath}/cart/${itemId}`, {
        data: {
          product_id: productId,
          qty: Number(itemQty)
        }
      });

      await getCart();


      setPlay(null);
    } catch (err) {
      console.log(err);
    }
  };



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  const onSubmit = handleSubmit(data => {
    checkOut(data);
  }); 



  


  const checkOut = async (formValue) => {
    setPlay('screen');

    try {
      await axios.post(`${baseUrl}/v2/api/${apiPath}/order`, {
        data: {
          user: {...formValue},
          message: formValue.message
        }
      });
      

      await getCart();

      
      reset();
      
      setPlay(null);
    } catch (err) {
      console.log(err);
    }
  };




  const [play, setPlay] = useState('screen');










  const stuff = { 
    login,
    getProducts,
    setDetail,
    addCart,
    getCart,
    editItem,
    setInputKey,

    products,
    detail,
    carts,
    zeroCart,
    inputKey,
    
    OGTotal,
    DCTotal,

    delItem,

    register,
    errors,
    onSubmit,

    play
  };


 

  return (
    <Dbox.Provider value={stuff}>
      {children}
    </Dbox.Provider>
  )
}