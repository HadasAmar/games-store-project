import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_category } from "../redux/actions/categoryAction";
import { addCategory, updateCategory } from "../axios/categoryAxios";
import { useNavigate, useParams } from "react-router-dom";
import { update_category } from "../redux/actions/categoryAction";

export const AddCategory = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const myCategories = useSelector((x) => x.dataCategoryReducer.listCategories);
    const [myExeption, setMyExeption] = useState({});
    const [categoryItem, setCategoryItem] = useState(id!=undefined?{name: myCategories.find((x) => x._id ==id).name}:{ name: "" });
    const navigate = useNavigate();

    const checkName = (e) => {
        let txt = e.target.value;
        let notValid = !txt.match("[א-ת]{3,}");
        if (txt =="") {
            setMyExeption({ ...myExeption, name: "חובה להכניס שם קטגוריה" });
        } else if (notValid) {
            setMyExeption({ ...myExeption, name: "חובה להכניס לפחות 3 אותיות בעברית" });
        } else {
            setMyExeption({ ...myExeption, name: null });
            setCategoryItem({ ...categoryItem, name: txt });
        }
    };

    const handleSubmit = (e) => {   
        e.preventDefault();
        if (myExeption.name || categoryItem.name== "") {
            alert("יש לתקן את השגיאות לפני הוספת הקטגוריה");
            return;
        }
        id == undefined ?
            addCategory(categoryItem)
                .then((x) => {
                    dispatch(add_category(x.data));
                    setCategoryItem({ name: "" });
                    alert("הקטגוריה נוספה בהצלחה");
                    navigate("/myCategories");
                })
                .catch((err) => console.log(err)) :
            updateCategory(categoryItem, id)
                .then((x) => {
                    dispatch(update_category(x.data));
                    alert("הקטגוריה עודכנה בהצלחה");
                    navigate("/myCategories");
                })
                .catch((err) => console.log(err))
    };

    return (
        <div style={{ backgroundColor: "#e9f7fc", height: "85vh", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
            <div className="container p-5 bg-white rounded shadow" style={{ maxWidth: "600px" }}>
                <h3 className="text-center mb-4" style={{ color: "#4a90e2" }}>{id == undefined ? "הוספת קטגוריה" : "עריכת קטגוריה"}</h3>
                <form onSubmit={(e) => {
                        handleSubmit(e);
                    }} >
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="הקלד שם קטגוריה"
                            className={`form-control ${myExeption.name ? "is-invalid" : ""}`}
                            onChange={(e)=>{setCategoryItem({ ...categoryItem, name: e.target.value }); checkName(e)}}
                            value={categoryItem.name}
                            style={{ borderRadius: "10px" }}
                        />
                        {myExeption.name && (
                            <div className="invalid-feedback">{myExeption.name}</div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">{id == undefined ? "הוסף קטגוריה" : "ערוך קטגוריה"} </button>
                </form>
            </div>
        </div >
    );
};
