import React from "react";

const Home = ({ currentStep, course,classes,subject,chapter,topic }) => {
  
  const sections = [
    {
      title: "Course",
      content: Object.keys(course).length && currentStep >= 0 ? course.courseName : "Course Name",
    },
    { title: "Class", content: Object.keys(classes).length && currentStep >= 1 ? classes.className :"Class Name" },
    { title: "Subject", content: Object.keys(subject).length && currentStep >= 2? subject.subjectName :"Subject Name" },
    { title: "Chapter", content: Object.keys(chapter).length && currentStep >= 3? chapter.chapterName :"Chapter Name" },
    { title: "Topic", content: Object.keys(topic).length && currentStep >= 4 ? topic.topicName :"Topic Name" },
  ];

  return (
    <div className="bg-[#206CA2]   md:mt-12 shadow-lg shadow-black  w-60">
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
          <p className="text-white ml-2">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
