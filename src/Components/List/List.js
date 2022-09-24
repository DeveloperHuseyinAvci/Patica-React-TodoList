import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackXmark } from "@fortawesome/free-solid-svg-icons";

function List({ addNote, delData, id, addData, setData }) {
  const checkFunc = () => {
    // eslint-disable-next-line array-callback-return
   const checkBtn = addData.map((not) => {
      if (addNote.note === not.note) {
        return { ...not, isChecked: !not.isChecked };
      }

      return not;
    })
    setData(checkBtn);
    localStorage.setItem('note',JSON.stringify(checkBtn))
  };

  let checkboxClick = addNote.isChecked ? "checkbox_active" : "";
  const deleteNote = () => {
    delData(id);
  };

  return (
    <div className="list_not">
      <label>
        <input
          type="checkbox"
          checked={addNote.isChecked}
          onChange={checkFunc}
        />
      </label>

      <p className={checkboxClick}>{addNote.note}</p>

      <button onClick={deleteNote}>
        <FontAwesomeIcon className="icon_delete" icon={faSackXmark} />
      </button>
    </div>
  );
}

export default List;
