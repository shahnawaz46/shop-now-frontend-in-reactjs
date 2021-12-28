import React from 'react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

// components
import "../css/PlaceOrders.css";

const PlaceOrders = () => {
    const placeOrder = [{
        photo: 'http://localhost:9000//productImages/EzSNyvZHh-t_shirt_1.jpg',
        name: 'Sleeveless Tshirts',
        size: 'M',
        qty: '1',
        price: '499',
        status: 'deliverd',
        orderId: '#403-5586562-7682739'
    },
    {
        photo: 'http://localhost:9000//productImages/3bQAf1xhq-1_dress_1.jpg',
        name: 'Embroidered Kurta Set With Pant And Dupatta',
        size: 'M',
        qty: '1',
        price: '1499',
        status: '',
        orderId: '#403-5586562-7682739'
    }]

    return (
        <div className="placeorder-main-box">
            {
                !placeOrder ?
                    <div className="placeorder-no-order">
                        <MdOutlineRemoveShoppingCart className="placeorder-icon" />
                        <div className="placeorder-no-order-content">
                            <h3>You haven't placed any orders</h3>
                            <h4>All your orders will appear here</h4>
                        </div>
                    </div>
                    :
                    <div>
                        {
                            placeOrder.map((value, index) =>
                                <div className="placeorder-order-detail-box" key={index}>
                                    <div className="placeorder-product-detail-box">
                                        <img src={value.photo} alt="" />
                                        <div className="placeorder-product-detail">
                                            <span className="placeorder-product-name">{value.name}</span> <br />
                                            <div style={{ marginTop: '10px' }} className="placeorder-product-size-qty-price">
                                                <span>Size : {value.size}</span>
                                                <span style={{ marginLeft: '10px', marginTop: '10px' }}>Qty : {value.qty}</span> <br />
                                                <span>Rs. {value.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="placeorder-product-status-box">
                                        <span className="placeorder-product-status">Status</span> <br />
                                        {
                                            value.status === "deliverd" ?
                                                <div className="placeorder-product-after-deliverd">
                                                    <p>Delivered</p>
                                                    <p>7 November 2018 </p>
                                                </div>
                                                :
                                                <div className="placeorder-product-track">
                                                    <p>Processing</p>
                                                    <button className="placeorder-product-track-button"> Track Order</button>
                                                </div>
                                        }
                                    </div>
                                    <div className="placeorder-order-detail">
                                        <span className="placeorder-product-order-id">Order Id: {value.orderId}</span>
                                        {
                                            value.status === "deliverd" ? <Link to="/order-detail"><p className="placeorder-product-deliverd"> View Order Details </p> </Link> : ''
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default PlaceOrders;
