import { useRef } from "react";
import ReactLoading from 'react-loading';


import useFun from "../../../funPack/useFun";



function ProductModal () {
  const { detail, inputKey, addCart, play } = useFun();

  const qtyRef = useRef(null);

  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              產品名稱：{detail?.title}
            </h2>

            <button
              type="button"
              className="btn-close fs-3 me-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body fs-5" style={{height: '650px'}}>
            <img
              src={detail?.imageUrl}
              alt={detail?.title}
              className="object-fit-cover w-100 h-75 mb-2"
            />
            <p className="mb-2">內容：{detail?.content}</p>
            <p className="mb-2">描述：{detail?.description}</p>
            <p className="mb-2">
              價錢：
              <del className="me-1">{detail?.origin_price}</del>元

              <span className="h5 mx-2">{'→'}</span>

              <span className="text-success me-1">{detail?.price}</span>元
            </p>

            <div className="input-group align-items-center">
              <label htmlFor="qtySelect">數量：</label>
              <select
                key={inputKey}
                id="qtySelect"
                className="form-select"
                ref={qtyRef}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex ms-auto align-items-center" style={{width: '140px'}}>
              {play === detail.id && <ReactLoading type="spin" color="black" width="1.5rem" height="1.5rem" />}

              <button type="button" className="btn btn-primary ms-auto" onClick={() => addCart(detail.id, qtyRef.current.value)}>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default ProductModal;