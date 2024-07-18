const ClassComponent = ({ classes, selectedClasses, handleClasses }) => {
  return (
    <>
      {classes.length &&
        classes.map((item, index) => (
          <button
            key={index}
            className={`${
              selectedClasses.includes(item.classId)
                ? "bg-red-600"
                : "bg-blue-600 "
            } me-2 mt-2 p-1 text-center text-white rounded-full min-w-20 `}
            onClick={() => {
              handleClasses(selectedClasses, item.classId);
            }}
          >
            {item.className}
          </button>
        ))}
    </>
  );
};

export default ClassComponent;
