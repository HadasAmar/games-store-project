export const MyList = (props) => {

    return <>
        <div style={{ display: "flex",
                justifyContent: "space-around",
                direction: "rtl",
                margin: "5rem",
                flexWrap: "wrap"}}>
            {props.arr.map((x, i) =>

                <div style={{padding: "2rem",
                    backgroundColor: x.done ? "lightgreen" : "#FF7F7F",
                    width: "13rem",
                    borderRadius: "8px",  
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
                    marginBottom: "20px"}} >
                    <p>{x.id}</p>
                    <p>{x.desc}</p>
                    <p>{<input type="checkbox" checked={x.done} onClick={()=>props.myClick(i,x.done)}></input>}</p>
                    <p>{x.time}</p>
                    <button onClick={()=>props.onDel(x.id)}>מחק</button>
                </div>
            )}
        </div>

    </>
}

