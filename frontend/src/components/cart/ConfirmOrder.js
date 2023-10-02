import MetaData from '../layouts/MetaData';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


export default function ConfirmOrder () {

    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const itemsPrice = 100;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice  + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2)
    
    const processPayment = () => {
        const data = {
            itemsPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }



    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />

            <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> 9600338406</p>
                
                
                <hr />
 
              
              
                

            </div>
			
            <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>

                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
            </div>
        </div>
        </Fragment>
        
    )
}