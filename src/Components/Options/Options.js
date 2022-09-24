import React from "react";

function Options({ dataLength, addData, setData, setStatus, status }) {
  const clearBtn = () => {
    // eslint-disable-next-line array-callback-return
    const allClear = addData.filter((not) => not.isChecked !== true);
    setData(allClear);
    localStorage.setItem("note", JSON.stringify(allClear));
  };

  const allBtn = () => {
    setStatus("all");
  };
  const allActive = () => {
    setStatus("active");
  };

  const allCompleted = () => {
    setStatus("completed");
  };

  return (
    <div className="options_container">
      <div className="box_one">
        <p className="item_number">{dataLength}</p>
        <p className="item_text">{addData.length > 1 ? "İtems" : "İtem"}</p>
        <p>Left</p>
      </div>

      <div className="box_two">
        <button
          onClick={allBtn}
          style={
            status === "all"
              ? { backgroundColor: "orange", color: "white" }
              : { backgroundColor: "" }
          }
          className="all"
        >
          All
        </button>
        <button
          onClick={allActive}
          style={
            status === "active"
              ? { backgroundColor: "orange", color: "white" }
              : { backgroundColor: "" }
          }
          className="active"
        >
          Active
        </button>
        <button
          onClick={allCompleted}
          style={
            status === "completed"
              ? { backgroundColor: "orange", color: "white" }
              : { backgroundColor: "" }
          }
          className="completed"
        >
          Completed
        </button>
      </div>

      <div className="box_three">
        {
          addData.find(not => not.isChecked === true) &&  <button onClick={clearBtn} className="clear_completed">
          Clear Completed
        </button>
        }
        
      </div>
    </div>
  );
}

export default Options;
