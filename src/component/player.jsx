import { useState } from "react";

export default function Player({initialName,symbol,isActive,onChangeName},...props){
    const [playername,setPlayerName] = useState(initialName)
    const [isEditing,setIsEditing] = useState(false);
    function handleClick(){
        setIsEditing((editing)=>!editing);
        onChangeName(symbol,playername);
    }
    function handleChange(event){
        setPlayerName(event.target.value);
    }
    let editableplayername = <span className="player-name">{playername}</span>;
    if(isEditing){
        editableplayername = (<input type="text" required value={playername} onChange={handleChange} />);
    }
    return (
        <li className={isActive?'active':undefined}>
            <span className="player">
              {editableplayername}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
        </li>
    );
}