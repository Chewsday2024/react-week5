

import useFun from "../funPack/useFun";




function Cart () {


  const { carts, delItem, editItem } = useFun();
  

  return (
    <>
      {carts.map((cart, index) => (
          <tr key={index} className="text-center fs-5">
            <td>
              <button type="button" className="btn btn-outline-danger fw-bold" onClick={() => delItem(cart.id)}>
                x
              </button>
            </td>

            <td className="w-25"><img className="w-100" src={cart.product.imageUrl} alt={cart.product.title} /></td>

            <td>{cart.product.title}</td>

            <td>
              <div className="d-flex justify-content-center align-items-center">
                <div className="btn-group me-2" role="group">
                  <button
                  onClick={() => editItem(cart.id, cart.product.id, cart.qty - 1)}
                    type="button"
                    className="btn btn-outline-dark"
                    disabled={cart.qty === 1}
                  >
                    -
                  </button>

                  <span className="btn border border-dark">{cart.qty}</span>

                  <button
                    onClick={() => editItem(cart.id, cart.product.id, cart.qty + 1)}
                    type="button"
                    className="btn btn-outline-dark"
                  >
                    +
                  </button>
                </div>

                <span>{cart.product.unit}</span>
              </div>
            </td>

            <td className="text-success fw-bold">$ {cart.product.price}</td>

            <td>$ {cart.total}</td>
          </tr>
        ))
      }
    </>
  )
}



export default Cart;