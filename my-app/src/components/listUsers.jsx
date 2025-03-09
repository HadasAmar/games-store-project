import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { load_customers } from "../redux/actions/customerAction";
import { getAllCustomers } from "../axios/customerAxios";

export const ListUsers = () => {
    let myCustomers = useSelector((x) => x.dataCustomerReducer.listCustomers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (myCustomers != null && myCustomers.length === 0) {
            getAllCustomers()
                .then((x) => dispatch(load_customers(x.data)))
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh", padding: "2rem 0" }}>
            <div className="container" style={{ backgroundColor: "#e9f7fc" }}>
                <h2 className="text-center mb-4" style={{ color: "#4a90e2" }}>רשימת משתמשים</h2>
                <table className="table table-bordered table-hover table-striped shadow-sm">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">שם</th>
                            <th scope="col">סיסמא</th>
                            <th scope="col">מספר אשראי</th>
                            <th scope="col">תוקף</th>
                            <th scope="col">קוד אשראי</th>
                            <th scope="col">בעל האשראי</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCustomers.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.password}</td>
                                <td>{item.cardNumber}</td>
                                <td>{item.cardExpiration}</td>
                                <td>{item.cardCVV}</td>
                                <td>{item.cardHolder}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
