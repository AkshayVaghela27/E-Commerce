import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AppState = (props) => {
  const url = "http://localhost:8088/api"
  const [products, setProducts] = useState([])
  const [token, setToken] = useState([])
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [filterData, setfilterData] = useState([]);
  const [user, setuser] = useState()
  const [cart, setcart] = useState([])
  const [reload, setreload] = useState(false)
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      })

      console.log(api.data.products)
      setProducts(api.data.products)
      setfilterData(api.data.products)
      userProfile()
    }

    fetchProduct();
    userCart()
  }, [token])

  useEffect(() => {

    let lstoken = localStorage.getItem("token")
    console.log(lstoken)
    if (lstoken) {
      setToken(lstoken)
      setisAuthenticated(true)
    }
  })


  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/user/register`, { name, email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    })
    //alert(api.data.message)
    //console.log("User register",api)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  }


  //login user
  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`, { email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    })
    //alert(api.data.message)
    //console.log("User register",api)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setToken(api.data.token)
    setisAuthenticated(true)
    localStorage.setItem('token', api.data.token)
    return api.data;
  }

  //logout user
  const logout = () => {
    setisAuthenticated(false)
    setToken(" ")
    localStorage.removeItem("token")
    toast.success("Logout Successfully..!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  }

  //user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    })

    //console.log(api.data)
    setuser(api.data.user)

  }

  //add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(`${url}/cart/add`, { productId, title, price, qty, imgSrc }, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    })
    setreload(!reload)
    // console.log("my cart",api)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    })
    setcart(api.data.cart);
  }

  //  --qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setreload(!reload);
    // console.log("decrease cart items ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //  remove Item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setreload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //  clear Cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setreload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //shipping
  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    try {
      const api = await axios.post(
        `${url}/address/add`,
        { fullName, address, city, state, country, pincode, phoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth": token,
          },
          withCredentials: true,
        }
      );
  
      // Handle successful response
      setreload(!reload);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      return api.data;
    } catch (error) {
      // Handle network errors or server errors
      console.error("Error submitting shipping address:", error);
      toast.error("Failed to submit shipping address. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      // Return null or handle error state as needed
      return null;
    }
  };
  
  // Function to get user address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setUserAddress(api.data.userAddress);
  };

  // get User order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user order ", api.data);
    setUserOrder(api.data)
    
  };
console.log("user order = ", userOrder);

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setisAuthenticated,
        isAuthenticated,
        filterData,
        setfilterData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        getAddress,
        shippingAddress,
        userAddress,
        user_Order,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
