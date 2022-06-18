import React, { useState } from "react";
const orders = [
  {
    OrderId: "#ib-502229",
    DateOrder: "12 June 2022, 13:55",
    Delivered: false,
  },
  {
    OrderId: "#ib-80089",
    DateOrder: "12 July 2022, 9:16",
    DeliveryDate: "12 July 2022, 14:05",
    Delivered: true,
  },
];

const Orders = () => {
  return (
    <div className="orders">
      <div className="orders-container">
        <div className="container">
          <h3>Historic Orders</h3>
          <br></br>
          <ul>
            {orders.map((order) => (
              <li>
                <div className="row">
                  <div className="col-sm-9 order-item">
                    <div className="row">
                      <div className="col-sm-8">
                        <h4>Order Number: {order.OrderId}</h4>
                        <a href="#">View</a>
                        <p>Date Order: {order.DateOrder}</p>
                        <h6>Delivery Details</h6>
                        <p>
                          Delivered: {order.Delivered ? "Yes" : "No"}
                          {order.Delivered
                            ? ", On Date: " + order.DeliveryDate
                            : ""}
                        </p>
                      </div>
                      <div className="col-sm-4">
                        <div className="historic-order-actions">
                          <div className="remove-from-cart">
                            <i class="fa fa-close"></i>
                            {"\u00A0"}
                            <small>hide</small>
                            {"\u00A0"}
                            {"\u00A0"}
                            <i class="fa fa-repeat"></i>
                            <small>{"\u00A0"}re-order</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;
