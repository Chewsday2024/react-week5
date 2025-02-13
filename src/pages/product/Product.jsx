import { useEffect } from "react";
import ReactLoading from 'react-loading';
import axios from "axios";



import useFun from "../../funPack/useFun";


import ProductModal from "./productComponents/ProductModal"
import Cart from "../Cart";
import Form from "../Form";



function Product () {

  const { login,
          setDetail,
          setInputKey,
          addCart,
          zeroCart,

          products,
          carts,
          inputKey,

          OGTotal,
          DCTotal,
        
          play} = useFun();


  useEffect(() => {
    login();

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)dogfood\s*\=\s*([^;]*).*$)|^.*$/,"$1",);

    axios.defaults.headers.common['Authorization'] = token;
  }, []);
  
  
  
  return (
    <div className="container">
      
      <div className="mt-4">
        <ProductModal />

        <table className="table align-middle">
          <thead className="text-center">
            <tr className="fs-3">
              <th>圖片</th>

              <th>商品名稱</th>

              <th>價格</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {products && products.length > 0 
            ? (products.map(( product, index) => (
              <tr key={index} className="text-center">
                <td className="w-25">
                  <img className="w-100" src={product.imageUrl} />
                </td>

                <td className="h3">{product.title}</td>

                <td>
                  <div className="d-flex justify-content-around align-items-center">
                    <div>
                      <div className="h5 mb-1">原價</div>
                      <del className="h5 ">${product.origin_price}</del>
                    </div>

                    <span className="h1">{'→'}</span>

                    <div >
                      <div className="h5 mb-1">特價</div>
                      <h5 className="text-success fw-bold">${product.price}</h5>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="d-flex m-auto" style={{width: '205px'}}>
                    <div className="btn-group btn-group-sm">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setDetail(product) 
                          setInputKey((inputKey + 1) % 2)}} 
                        data-bs-toggle="modal" 
                        data-bs-target="#productModal">
                        查看更多
                      </button>
                          
                      <button type="button" className="btn btn-outline-danger" onClick={() => addCart(product.id, 1,)}>
                      <i className="bi bi-cart-fill me-1"></i>
                        加到購物車
                      </button>
                    </div>
                    
                    {play === product.id && <ReactLoading className="d-inline-block ms-2" type="spin" color="black" width="1rem" height="1rem" />}
                  </div>
                </td>
              </tr>
            )))
            : (<tr><td colSpan="5">尚無產品資料</td></tr>)}
            
          </tbody>
        </table>

        <div className={`text-end mb-3 ${!carts && 'd-none'}`}>
          <button className={`btn btn-outline-danger ${carts.length === 0 && 'd-none'}`} type="button" onClick={zeroCart}>清空購物車</button>
        </div>

        <table className={`table align-middle w-100 ${carts.length === 0 && 'd-none'}`}>
          <thead>
            <tr className="text-center fs-4">
              <th></th>

              <th>圖片</th>

              <th>品名</th>

              <th>數量/單位</th>

              <th>特價單價</th>

              <th>單項總價</th>
            </tr>
          </thead>

          <tbody>
            <Cart />
          </tbody>

          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="fs-5">原價總價：$ {OGTotal()}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-success fs-5">特價總價：$ {DCTotal()}</td>
            </tr>
          </tfoot>
        </table>

        <h1 className={`text-center mt-5 ${carts.length === 0 ? 'd-block' : 'd-none'}`}>尚無購物車資料</h1>
      </div>


      <Form />


      {play === 'screen' && (<div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(130, 130, 130, 0.42)",
                    zIndex: 999,
                  }}>

                  <ReactLoading type="spin" color="black" width="4rem" height="4rem" />

                </div>)}
    </div>
  )
}


export default Product;