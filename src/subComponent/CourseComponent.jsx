
const CourseComponent = ({ course, selectedCourse, handleCourse }) => {
  
  return (
    <>
      {course.length &&
        course.map((item, index) => (
          <button
            key={index}
            className={`${
              selectedCourse.includes(item.courseId)
                ? "bg-red-600"
                : "bg-blue-600 "
            } me-2 mt-2 p-1 text-center text-white rounded-full min-w-20 `}
            onClick={() => {
              handleCourse(selectedCourse, item.courseId);
            }}
          >
            {item.courseName}
          </button>
        ))}
    </>
  );
};

export default CourseComponent;
