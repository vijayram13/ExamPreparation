import { useState } from "react";
const SubjectComponent = ({ subject, selectedSubject, handleSubject }) => {
  const [render, setRender] = useState(1);
  return (
    <>
      {subject.length &&
        subject.map((item, index) => (
          <button
            key={index}
            className={`${
              selectedSubject.includes(item.subjectId)
                ? "bg-red-600"
                : "bg-blue-600"
            } me-2 mt-2 p-1 text-center text-white rounded-full min-w-20 `}
            onClick={() => {
              handleSubject(selectedSubject, item.subjectId);
              setRender(render + 1);
            }}
          >
            {item.subjectName}
          </button>
        ))}
    </>
  );
};

export default SubjectComponent;
