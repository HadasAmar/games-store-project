import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addGame, updateGame } from "../axios/gameAxios";
import { add_game, update_game } from "../redux/actions/gameAction";
import { getAllCategories } from "../axios/categoryAxios";
import { load_categories } from "../redux/actions/categoryAction";

export const AddGame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams().id;

    const categories = useSelector((x) => x.dataCategoryReducer.listCategories);
    const games = useSelector((x) => x.dataGameReducer.listGames);

    const [gameItem, setGameItem] = useState(
        id == undefined
            ? { name: null, id_category: null, price: null, img: null, quantity: null }
            : games.find((x) => x._id === id)
    );

    const [myExeption, setMyExeption] = useState({
        name: null,
        id_category: null,
        price: null,
        img: null,
        quantity: null,
    });

    useEffect(() => {
        if (categories.length === 0) {
            getAllCategories()
                .then((res) => {
                    dispatch(load_categories(res.data));
                })
                .catch((err) => console.error("Error fetching categories:", err));
        }
    }, [categories, dispatch]);

    const validateField = (field, value) => {
        let error = null;
        switch (field) {
            case "name":
                if (!value) {
                    error = "חובה להכניס שם משחק";
                } else if (value.length < 3) {
                    error = "שם המשחק חייב להכיל לפחות 3 תווים";
                }
                break;
            case "id_category":
                if (!value) {
                    error = "חובה לבחור קטגוריה";
                }
                break;
            case "price":
                if (!value) {
                    error = "חובה להכניס מחיר";
                } else if (value <= 0) {
                    error = "המחיר חייב להיות גדול מ-0";
                }
                break;
            case "img":
                if (!value) {
                    error = "חובה להכניס שם תמונה";
                }
                break;
            case "quantity":
                if (!value) {
                    error = "חובה להכניס כמות";
                } else if (value < 0) {
                    error = "הכמות לא יכולה להיות שלילית";
                }
                break;
            default:
                break;
        }
        setMyExeption({ ...myExeption, [field]: error });
    };

    const handleChange = (field, value) => {
        setGameItem({ ...gameItem, [field]: value });
        validateField(field, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(myExeption).some((error) => error != null);
        const hasNull = Object.values(gameItem).some((value) =>!value);
        if (id==undefined&&(hasErrors || hasNull)) {
            console.log("gameItem", gameItem)
            console.log("exception", myExeption)
            alert("יש למלא שדות או לתקן את השגיאות");
            return;
        }

        id ==undefined
            ? addGame(gameItem)
                  .then((x) => {
                      dispatch(add_game(x.data));
                      alert("המשחק נוסף בהצלחה");
                      navigate("/myGames");
                  })
                  .catch((err) => console.error(err))
            : updateGame(gameItem, id)
                  .then((x) => {
                      dispatch(update_game(x.data));
                      alert("המשחק עודכן בהצלחה");
                      navigate("/myGames");
                  })
                  .catch((err) => console.error(err));
    };

    return (
        <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="container p-5 bg-white rounded shadow" style={{ maxWidth: "600px" }}>
                <h3 className="text-center mb-4" style={{ color: "#4a90e2" }}>
                    {id === undefined ? "הוספת משחק" : "עריכת משחק"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="הקלד שם משחק"
                            className={`form-control ${myExeption.name ? "is-invalid" : ""}`}
                            value={gameItem.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        {myExeption.name && <div className="invalid-feedback">{myExeption.name}</div>}
                    </div>
                    <div className="mb-3">
                        <select
                            className={`form-control ${myExeption.id_category ? "is-invalid" : ""}`}
                            onChange={(e) => handleChange("id_category", e.target.value)}
                            value={gameItem.id_category}
                        >
                            <option value="" disabled>
                                בחר קטגוריה
                            </option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {myExeption.id_category && <div className="invalid-feedback">{myExeption.id_category}</div>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder="הקלד מחיר"
                            className={`form-control ${myExeption.price ? "is-invalid" : ""}`}
                            value={gameItem.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                        />
                        {myExeption.price && <div className="invalid-feedback">{myExeption.price}</div>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="הקלד שם תמונה"
                            className={`form-control ${myExeption.img ? "is-invalid" : ""}`}
                            value={gameItem.img}
                            onChange={(e) => handleChange("img", e.target.value)}
                        />
                        {myExeption.img && <div className="invalid-feedback">{myExeption.img}</div>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder="הקלד כמות"
                            className={`form-control ${myExeption.quantity ? "is-invalid" : ""}`}
                            value={gameItem.quantity}
                            onChange={(e) => handleChange("quantity", e.target.value)}
                        />
                        {myExeption.quantity && <div className="invalid-feedback">{myExeption.quantity}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {id === undefined ? "הוסף משחק" : "ערוך משחק"}
                    </button>
                </form>
            </div>
        </div>
    );
};
