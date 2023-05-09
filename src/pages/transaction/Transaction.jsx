import React from "react";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
    LocationCity,
    Home,
    Language,
    LocalPostOffice,
  } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./transaction.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import ProductImage from "./ProductImage";


export default function Transaction() {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];    
    const [transaction, settransaction]= useState([]);
    const [prodId, setProdId] = useState([]);
    //console.log(orderId);


    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const res = await userRequest.get("/orders/transaction/"+orderId);
            settransaction(res.data)
          } catch (error) {
            console.error(error);
          }
        };
        fetchOrder();
      }, [orderId]);


    


      // const products = transaction.products && transaction.products.map((product) => {
      //   console.log(product._id)
      // });

      const [deliveryStatus, setDeliveryStatus] = useState(
        transaction ? transaction.delivery_status : ''
      );
      const [paymentStatus, setPaymentStatus] = useState( 
        transaction ? transaction.payment_status : ''
      );

      const handleUpdate = async (e) => {
        
        try {
          const res = await userRequest.patch(`/orders/status/${transaction._id}`, {
            delivery_status: deliveryStatus,
            payment_status: paymentStatus,
          });
          console.log(res.data);
          
        } catch (error) {
          console.error(error);
        }
      };

//      console.log(paymentStatus)

      return (



      <div className="transaction">
        <div className="transactionTitleContainer">
          <h1 className="transactionTitle"> Order ID: {orderId} </h1>
          <Link to="/newtransaction">
            <button className="transactionAddButton">Create</button>
          </Link>
        </div>

        <div className="transactionContainer">
          <div className="transactionShow">
            <div className="transactionShowTop">
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="transactionShowImg"
              />
              <div className="transactionShowTopTitle">
                <span className="transactionShowtransactionname">
                {transaction.userId && transaction.userId.username}
                </span>
                <span className="transactionShowtransactionTitle">Customer</span>
              </div>
            </div>
            <div className="transactionShowBottom">
              <span className="transactionShowTitle">Account Details</span>
              <div className="transactionShowInfo">
                <PermIdentity className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.userId && transaction.userId._id}
                </span>
              </div>
              {/* <div className="transactionShowInfo">
                <CalendarToday className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">10.12.1999</span>
              </div> */}
              <span className="transactionShowTitle">Contact Details</span>
              <div className="transactionShowInfo">
                <PhoneAndroid className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.userId && transaction.userId.phone}
                </span>
              </div>
              <div className="transactionShowInfo">
                <MailOutline className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.userId && transaction.userId.email}
                </span>
              </div>
              <div className="transactionShowInfo">
                <LocationSearching className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.shipping && transaction.shipping.country}
                </span>
              </div>
            </div>
          </div>
          <div className="transactionUpdate">
            <span className="transactionUpdateTitle">Order</span>
            <form className="transactionUpdateForm" onSubmit={handleUpdate}>
              <div className="transactionUpdateLeft">
                <div className="transactionUpdateItem">
                  <label>OrderId: </label>
                  {transaction && transaction._id}
                </div>
                {/* <div className="transactionUpdateItem">
                  <label>payment intent Id</label>
                  {transaction && transaction.paymentIntentId}
                </div> */}
                <div className="transactionUpdateItem">
                  <label>Total</label>
                  $ {transaction && transaction.total}
                </div>
                {transaction && transaction.discount && (
                  <div className="transactionUpdateItem">
                    <label>Discount</label>
                    {transaction.discount.percentageOff ? `${transaction.discount.percentageOff}%` : "0%"}  &emsp;
                    {transaction.discount.percentageOff ? `${transaction.discount.amountOff}%` : "$0"} 
                  </div>
                )}
                <div className="transactionUpdateItem">
                <label>Paymnent status: {transaction && transaction.payment_status}</label>
                  
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                <div className="transactionUpdateItem">
                  <label>Delivery Status: {transaction && transaction.delivery_status}</label>
                  <select
                    value={deliveryStatus}
                    onChange={(e) => setDeliveryStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="transactionUpdateRight">
                <div className="transactionUpdateUpload">

                </div>
                <button className="transactionUpdateButton">Update</button>
              </div>
            </form>
          </div>

        </div>
 
        <div className="transactionContainer">
          <div className="transactionShow">
         
            <div className="transactionShowBottom">
              <span className="transactionShowTitle">Shipping Details</span>
              <div className="transactionShowInfo">
                <PermIdentity className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.shipping && transaction.shipping.name}
                </span>
              </div>
              {/* <div className="transactionShowInfo">
                <CalendarToday className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">10.12.1999</span>
              </div> */}
              
              <div className="transactionShowInfo">
                <Home className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.shipping && transaction.shipping.address}
                </span>
              </div>
              <div className="transactionShowInfo">
                <LocationCity className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.shipping && transaction.shipping.city}
                </span>
              </div>
              <div className="transactionShowInfo">
                <LocationSearching className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.shipping && transaction.shipping.state}
                </span>
              </div>
              <div className="transactionShowInfo">
                <LocalPostOffice className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.shipping && transaction.shipping.zip}
                </span>
              </div>
              <div className="transactionShowInfo">
                <Language className="transactionShowIcon" />
                <span className="transactionShowInfoTitle">
                {transaction.shipping && transaction.shipping.country}
                </span>
              </div>
            </div>
          </div>
          <div className="transactionUpdate">
            <span className="transactionUpdateTitle">Products Purchased</span>
           
        

        

        {transaction.products && transaction.products.map((product) => (
          <div className="productInfo" key={product._id}>
              <div className="transactionUpdateLeft">
                <div className="productsItem">
                  <label>Product Id: </label>
                  {product._id}
                </div>
                <div className="productsItem">
                  <label>Color </label>
                  {product.color}
                </div>
                <div className="productsItem">
                  <label>Size: </label>
                  {product.size}
                </div>
                <div className="productsItem">
                  <label>In Stock:  </label>
                  {product.inStock ? (
                      <span style={{ color: "green" }}>Yes</span>
                    ) : (
                      <span style={{ color: "red" }}>Out of stock</span>
                    )}
                </div>

                <div className="productsItem">
                  <label>Price: </label>
                   $ {product.price}
                </div>
                <div className="productsItem">
                  <label>Quantity: </label>
                  {product.quantity}
                </div>
              </div>

              <div className="transactionUpdateRight">
                <div className="transactionUpdateUpload">
                 <ProductImage productId={product.img} />
                </div>
              </div>
          </div>
        ))}
            
          </div>

        </div>
        
  {/* <ul>
    {transaction.products.map((product) => (
      <li key={product._id}>{product.name}</li>
    ))}
  </ul>
  <h3>Shipping Address</h3> */}
  {/* <p>Name: {transaction.shipping.name}</p>
  <p>Email: {transaction.shipping.email}</p>
  <p>Phone: {transaction.shipping.phone}</p>
  <p>Address: {transaction.shipping.address}</p>
  <p>Tax Exempt: {transaction.shipping.tax_exempt}</p>
      </div>  */}
      </div>
    );
  }
