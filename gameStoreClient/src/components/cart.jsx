import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add_order, load_orders, set_amount } from "../redux/actions/cartAction";
import { addOrder, getByUser } from "../axios/orderAxios";

const Cart = () => {
    const cartItems = useSelector((x) => x.dataCartReducer.cartItems);
    const currentIsLog = useSelector((x) => x.dataCustomerReducer.currentUser);
    const orders = useSelector((x) => x.dataCartReducer.orders);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let sum = 0;

    const logOrOrdering = () => {
        if (currentIsLog.name === "לא מחובר") {
            navigate("/myLogin");
        }
        else {
            const orderItem = {
                id_customer: currentIsLog._id,
                dateOrder: new Date(),
                sum: sum,
                orderGames: cartItems.map((item) => ({ _id: item._id, amount: item.amount })),
            };
            addOrder(orderItem)
                .then((x) => {
                    dispatch(add_order(x.data));
                    alert("ההזמנה נוספה בהצלחה")
                    getByUser(currentIsLog._id)
                        .then((orders) => dispatch(load_orders(orders.data)))
                        .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            debugger;
        }
    };

    return (
        <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="container p-5 bg-white rounded shadow" style={{ maxWidth: "800px" }}>
                <h3 className="text-center mb-4" style={{ color: "#4a90e2" }}>סל הקניות שלך</h3>
                {cartItems.length == 0 ? (
                    <p className="text-center text-secondary">הסל ריק.</p>
                ) : (
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>שם מוצר</th>
                                    <th>מחיר</th>
                                    <th>תמונה</th>
                                    <th>כמות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, i) => {
                                    sum += item.amount * item.price;
                                    return (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.price} ש"ח</td>
                                            <td>
                                                <img src={`http://localhost:8080/${item.img}`}
                                                    style={{ width: "100px" }} alt={item.name} />
                                            </td>
                                            <td>כמות {item.amount}

                                            </td>
                                            <td>
                                                <button className="btn btn-primary m-2" style={{ width: "35px" }} onClick={() => dispatch(set_amount(item.amount + 1, item._id))}>+</button>
                                                <button className="btn btn-primary m-2" style={{ width: "35px" }} onClick={() => dispatch(set_amount(item.amount - 1, item._id))}>-</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <h4 className="text-end mt-4" style={{ color: "#4a90e2" }}>סכום המוצרים בעגלה: {sum} ש"ח</h4>
                        <button
                            className="btn btn-primary w-100 mt-4"
                            onClick={logOrOrdering}>
                            סיום קנייה
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
