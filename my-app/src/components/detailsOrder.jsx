import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const DetailsOrder = () => {

    const orders = useSelector((x) => x.dataCartReducer.orders);
    const myId = useParams().id 
    const myOrder = orders.find((x) => x._id == myId)

    return (<div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="container p-5 bg-white rounded shadow" style={{ maxWidth: "800px" }}>
            <h3 className="text-center mb-4" style={{ color: "#4a90e2" }}>משחקים בהזמנה: </h3>
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
                    {myOrder.orderGames.map((item, i) =>
                        <tr key={i}>
                            <td>{item._id.name}</td>
                            <td>{item._id.price} ש"ח</td>
                            <td>
                                <img src={`http://localhost:8080/${item._id.img}`}
                                    style={{ width: "100px" }} alt={item.name} />
                            </td>
                            <td>{item.amount} </td>

                        </tr>
                    )
                    }
                </tbody>
            </table>
            <h4 className="text-center mb-4" style={{ color: "#4a90e2" }}>תשלום :  {myOrder.sum}</h4>

        </div>
    </div>
    );

}