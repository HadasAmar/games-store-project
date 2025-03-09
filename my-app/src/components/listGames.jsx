import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGame, getAllGames } from "../axios/gameAxios";
import { delete_game, load_games } from "../redux/actions/gameAction";
import { getAllCategories } from "../axios/categoryAxios";
import { load_categories } from "../redux/actions/categoryAction";
import { useNavigate, useParams } from "react-router-dom";

export const ListGames = () => {
  let myGames = useSelector((x) => x.dataGameReducer.listGames);
  const myCategories = useSelector((x) => x.dataCategoryReducer.listCategories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (myCategories != null && myCategories.length ==0) {
      getAllCategories()
        .then((x) => dispatch(load_categories(x.data)))
        .catch((err) => console.log(err));
    }

    if (myGames != null && myGames.length === 0) {
      getAllGames()
        .then((x) => dispatch(load_games(x.data)))
        .catch((err) => console.log(err));
    }
  }, [myCategories], [myGames]);

  const handleUpdate = (id) => {
    navigate(`/myEditGame/${id}`);
  };

  const handleDelete = (id) => {
    deleteGame(id)
            .then((x) => {
                dispatch(delete_game(id));
            })
            .catch((err) => console.log(err));
  };

  return (
    <>
      <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh" }}>
        <h2 className="text-center py-4" style={{ color: "#4a90e2" }}>
          מוצרים בחנות
        </h2>
        <table className="table table-bordered table-hover table-striped container shadow-sm">
          <thead className="bg-light">
            <tr>
              <th>שם</th>
              <th>קטגוריה</th>
              <th>מחיר</th>
              <th>כמות במלאי</th>
              <th>תמונה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {myGames.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>
                  {myCategories.find((x) => x._id === item.id_category)?.name}
                </td>
                <td>{item.price} ₪</td>
                <td>{item.quantity}</td>
                <td>
                  <img
                    src={`http://localhost:8080/${item.img}`}
                    style={{
                      width: "100px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    alt={item.name}
                  />
                </td>
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
    </>
  );
};
