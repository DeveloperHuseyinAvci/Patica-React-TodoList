import { useState, useEffect } from "react";
import List from "../List/List";
import Options from "../Options/Options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Input() {
  const [todo, setTodo] = useState({ note: "", isChecked: false });
  const [addData, setAddData] = useState([]);
  const [status, setStatus] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("note"));
    if (getData === null) {
      setAddData([])
    }else{
      setAddData(getData)
    }
  }, []);

  const filterBtnFunc = () => {
    switch (status) {
      case "all":
        setFilterData(addData);
        break;

      case "active":
        setFilterData(addData.filter((not) => not.isChecked === false));
        break;

      case "completed":
        setFilterData(addData.filter((not) => not.isChecked === true));
        break;

      default:
        setFilterData(addData);
        break;
    }
  };

  useEffect(() => {
    filterBtnFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, addData]);

  let addDataLength = addData.filter((not) => not.isChecked === false).length;

  const onChangeInput = (e) => {
    setTodo({ note: e.target.value, isChecked: false });
  };

  const onSub = (e) => {
    e.preventDefault();

    // eslint-disable-next-line
    if (todo.note == "") {
      return false;
    }

    setAddData([...addData, todo]);

    localStorage.setItem('note',JSON.stringify([...addData, todo]))

    setTodo({ note: "", isChecked: false });
  };

  const delData = (id) => {
    const newAddData = addData.filter((item, i) => {
      return id !== i;
    });

    localStorage.setItem('note',JSON.stringify(newAddData))
    setAddData(newAddData);
  };

  const allChecked = () => {
    const listChecked = addData.map((not) => {
      if (not.isChecked === false) {
        return true;
      }
    });

    const newListChecked = addData.map((not) => {
      if (not.isChecked === false) {
        not.isChecked = !not.isChecked;
      }
      return not;
    });

    if (listChecked.includes(true)) {
      setAddData(newListChecked);
      localStorage.setItem('note',JSON.stringify(newListChecked))
    } else {
      const listFalse = addData.map((not) => {
        if (not.isChecked) {
          not.isChecked = !not.isChecked;
        }
        return not;
      });
      setAddData(listFalse);
      localStorage.setItem('note',JSON.stringify(listFalse))
    }
  };

  return (
    <div className="container">
      <button className="all_check_btn" onClick={allChecked}>
        <FontAwesomeIcon className="icon" icon={faAngleDown} />
      </button>
      <form onSubmit={onSub} className="inp-content">
        <input
          placeholder="What needs to be done ?"
          onChange={onChangeInput}
          name="needs"
          value={todo.note}
        />
      </form>

      <div className="list_container">
        {filterData.map((note, i) => {
          return (
            <List
              id={i}
              key={i}
              addNote={note}
              delData={delData}
              addData={addData}
              setData={setAddData}
            />
          );
        })}
      </div>

      <Options
        dataLength={addDataLength}
        addData={addData}
        setData={setAddData}
        setStatus={setStatus}
        status={status}
      />
    </div>
  );
}

export default Input;
