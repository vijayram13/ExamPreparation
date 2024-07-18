import React, { useState } from "react";

const List = ({ fruit, selectedFruits, handleClick }) => {
  // const [list, setList] = useState(items);
  const [rerender, setRerender] = useState(1);

  return (
    <>
      {rerender && (
        <button
          className={
            selectedFruits.includes(fruit.id)
              ? "bg-red-600 mx-5 p-4 text-white"
              : "bg-blue-600 mx-5 p-4 text-white"
          }
          onClick={() => {
            handleClick(fruit.id);
            setRerender(rerender + 1);
          }}
        >
          {fruit.name}
        </button>
      )}
    </>
  );
};

export default List;
