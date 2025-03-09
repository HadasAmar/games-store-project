
export const MyTable=(props)=>{
    

    return <>
    
    <table style={{direction:"rtl",
            width: "100%",
            borderCollapse: "separate", // שינוי לשימוש במרחקים
            borderSpacing: "0 10px", // מרווחים בין השורות
            direction: "rtl",
            margin: "20px 0"
        }}>
        <thead>
            <tr>
                <th>קוד</th>
                <th>תיאור</th>
                <th>האם בוצע</th>
                <th>זמן</th>
            </tr>
        </thead>
        <tbody>
            {props.arr.map((x,i)=>(
                <tr key={x.id} 
                style={{ backgroundColor: x.done ? "lightgreen" : "#FF7F7F" }}>
                    <td>{x.id}</td>
                    <td>{x.desc}</td>
                    <td>{<input type="checkbox" checked={x.done} onClick={()=>props.myClick(i,x.done)}></input>}</td>
                    <td>{x.time}</td>
                    <td>
                    <button onClick={()=>props.onDel(x.id)}>מחק</button>                
                    </td>
                    </tr>
            ))}
        </tbody>
    </table>
    </>
}

