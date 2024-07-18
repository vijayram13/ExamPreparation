import React, { useEffect, useState } from "react";

const Home = ({
  currentStep,
  courses,
  classes,
  subjects,
  chapters,
  topics,
  selectedCourse,
  selectedClasses,
  selectedSubject,
  selectedChapter,
  selectedTopic,
}) => {
  const [render, setRender] = useState(1);
  useEffect(() =>{
    console.log("selectedSubject=" + selectedSubject); 
  },[selectedSubject.length]);
  console.log(selectedSubject);
  // course 
  const homeCourse = courses.filter(
    (item) => item.courseId === selectedCourse[0]
  );

  // class
  const homeClass = classes.filter(
    (item) => item.classId === selectedClasses[0]
  );
  // subject
  const homeSubject = subjects.filter((item) =>
    selectedSubject.includes(item.subjectId)
  );

  // chapters
  // topic

  const sections = [
    {
      title: "Course",
      content:
        homeCourse.length && currentStep >= 0
          ? homeCourse[0].courseName
          : "Course Name",
    },
    {
      title: "Class",
      content:
        homeClass.length && currentStep >= 1
          ? homeClass[0].className
          : "Class Name",
    },
    {
      title: "Subject",
      content:
        homeSubject.length && currentStep >= 2 ? homeSubject : "Subject Name",
    },
    //     { title: "Chapter", content: Object.keys(chapter).length && currentStep >= 3? chapter.chapterName :"Chapter Name" },
    //     { title: "Topic", content: Object.keys(topic).length && currentStep >= 4 ? topic.topicName :"Topic Name" },
  ];

  return (
    // <div className="bg-[#206CA2]   md:mt-3 shadow-lg shadow-black   rounded-md">
    //   {sections.map((section, index) => (
    //     <div
    //       key={index}
    //       className={`p-3 cursor-pointer border-l-2 mt-2  ${
    //         index === currentStep ? "border-yellow-300" : "border-transparent"
    //       }`}
    //     >
    //       <h1 className="text-yellow-300 font-semibold ml-2">
    //         {section.title}
    //       </h1>
    //       {/* <p className="text-white ml-2">{section.content}</p> */}

    //       {currentStep > 1 && Array.isArray(section.content) ? (
    //         section.content.map((item, index) => (
    //           <p key={index} className="text-white ml-2">
    //             {item.subjectName}
    //           </p>
    //         ))
    //       ) : (
    //         <p className="text-white ml-2">{section.content}</p>
    //       )}
    //     </div>
    //   ))}
    // </div>

    <div className="bg-[#206CA2]   md:mt-3 shadow-lg shadow-black   rounded-md">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`p-3 cursor-pointer border-l-2 mt-2  ${
            index === currentStep ? "border-yellow-300" : "border-transparent"
          }`}
        >
          <h1 className="text-yellow-300 font-semibold ml-2">
            {section.title}
          </h1>
          {/* <p className="text-white ml-2">{section.content}</p> */}

          {currentStep > 1 && Array.isArray(section.content) ? (
            section.content.map((item, index) => (
              <p key={index} className="text-white ml-2">
                {item.subjectName}
              </p>
            ))
          ) : (
            <p className="text-white ml-2">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
