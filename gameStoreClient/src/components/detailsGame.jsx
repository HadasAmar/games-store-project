import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../axios/categoryAxios";
import { load_categories } from "../redux/actions/categoryAction";
import { add_Item } from "../redux/actions/cartAction";

const DetailsGame = () => {
  const myGames = useSelector((x) => x.dataGameReducer.listGames);
  const myCategories = useSelector((x) => x.dataCategoryReducer.listCategories);
  const idGame = useParams().id;
  console.log("id ", idGame)
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const gameDetails = myGames.find((x) => x._id == idGame);

  console.log("gameDetails: ", gameDetails);
  useEffect(() => {
    if (myCategories != null && myCategories.length == 0) {
      getAllCategories()
        .then((x) => dispatch(load_categories(x.data)))
        .catch((err) => console.log(err));
    }
  }, []);

  const addToCart = (item) => {

    const obj = { ...item, amount: 1 }
    dispatch(add_Item(obj))
  }


  const categoryName = myCategories.find((x) => x._id == gameDetails.id_category).name;

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "2rem" }}>
      <div className="container shadow-lg rounded bg-white p-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={`http://localhost:8080/${gameDetails.img}`}

              alt="Game"
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-primary mb-3">{gameDetails.name}</h2>
            <p>
              קטגוריה: {categoryName}
            </p>
            <p>
              מחיר:{gameDetails.price} ₪
            </p>
            <button className="btn btn-primary w-100 mt-3" onClick={() => { addToCart(gameDetails); alert("המשחק נוסף לעגלה") ;navigate("/myHome")}}>הוסף לעגלה</button>
        </div>
      </div>
    </div>
    </div >
  );
};

export default DetailsGame;
