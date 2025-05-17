import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategories } from "../axios/categoryAxios";
import { useEffect } from "react";
import { delete_category, load_categories } from "../redux/actions/categoryAction";
import { useNavigate } from "react-router-dom";

export const ListCategories = () => {
    let myCategories = useSelector((x) => x.dataCategoryReducer.listCategories);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (myCategories != null && myCategories.length === 0) {
            getAllCategories()
                .then((x) => dispatch(load_categories(x.data)))
                .catch((err) => console.log(err));
        }
    }, []);

    const handleDelete = (id) => {
        deleteCategory(id)
        .then((x) => {
            dispatch(delete_category(id));
        })
        .catch((err) => console.log(err));
    }    

    const handleUpdate = (id) => {
        navigate(`/myEditCategory/${id}`);
    }
        

    return (
        <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh", padding: "2rem 0" }}>
            <div className="container" style={{ backgroundColor: "#e9f7fc" }}>
                <h2 className="text-center mb-4" style={{ color: "#4a90e2" }}>רשימת קטגוריות</h2>
                <table className="table table-bordered table-hover table-striped shadow-sm">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">שם קטגוריה</th>
                            <th scope="col">פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCategories.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-sm mx-1"
                                        onClick={() => handleUpdate(item._id)}
                                    >
                                        עדכון
                                    </button>
                                    <button
                                        className="btn btn-outline-primary btn-sm mx-1"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        מחיקה
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
