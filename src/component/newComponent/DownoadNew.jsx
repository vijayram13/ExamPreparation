import generatePDF from "react-to-pdf";
import React, { useState, useEffect, useRef } from "react";

import {
  FaGraduationCap,
  FaBook,
  FaClipboardList,
  FaFileUpload,
} from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { GiTeacher, GiNotebook } from "react-icons/gi";

import HomeNew from "../newComponent/HomeNew";
import ItemList from "../ItemList";
import DownloadPreview from "../DownloadPreview";
import Center from "../Center";
import {
  getCourses,
  getClasses,
  getSubjects,
  getChapters,
  getTopics,
} from "../../api";
import { Box, Container } from "@mui/material";

const steps = [
  { label: "Select Course", icon: FaGraduationCap },
  { label: "Select Class", icon: GiTeacher },
  { label: "Select Subject", icon: FaBook },
  { label: "Select Chapter", icon: GiNotebook },
  { label: "Select Topic", icon: FaClipboardList },
  { label: "Create Question", icon: RiNewspaperLine },
  { label: "Download Question", icon: FaFileUpload },
];

function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);

  // to download pdf
  const targetRef = useRef();
  // store the value of the current step
  const [course, setCourse] = useState({});
  const [classes, setClass] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);

  const [watermark, setWatermark] = useState("");
  // questionData
  const [questionData, setQuestionData] = useState(null);

  // fetch courses
  const fetchCourses = async () => {
    try {
      const result = await getCourses();
      const courses = result.data.map((course) => ({
        courseId: course.courseId,
        courseName: course.courseName,
      }));
      setData(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // fetch classes
  const fetchClasses = async () => {
    try {
      const result = await getClasses(course.courseId);
      const classes = result.data.map((cls) => ({
        classId: cls.classId,
        className: cls.className,
      }));
      setData(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // fetch subjects
  const fetchSubjects = async () => {
    try {
      const result = await getSubjects(classes.classId);
      const subjects = result.data.map((sub) => ({
        subjectId: sub.subjectId,
        subjectName: sub.subjectName,
      }));
      setData(subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // fetch chapters
  const fetchChapters = async () => {
    try {
      const result = await getChapters(subjects.map((sub) => sub.subjectId));
      const chapters = result.data.map((chapter) => ({
        chapterId: chapter.chapterId,
        chapterName: chapter.chapterName,
      }));
      setData(chapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  // fetch topics
  const fetchTopics = async () => {
    try {
      const result = await getTopics(chapters.map((chap) => chap.chapterId));
      const topics = result.data.map((topic) => ({
        topicId: topic.topicId,
        topicName: topic.topicName,
      }));
      setData(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    console.log("currentStep: " + currentStep);
    if (currentStep === 0) {
      fetchCourses();
    } else if (currentStep === 1) {
      fetchClasses();
    } else if (currentStep === 2) {
      fetchSubjects();
    } else if (currentStep === 3) {
      fetchChapters();
    } else if (currentStep === 4) {
      fetchTopics();
    } else if (currentStep === 5) {
      // TODO: select question from checkboxes
    } else if (currentStep === 6) {
      // preview of the selected questions
    }
  }, [currentStep]);

  // Function to check if a subject already exists in the array
  const subjectExists = (subjectsArray, newSubject) => {
    return subjectsArray.some(
      (subject) => subject.subjectId === newSubject.subjectId
    );
  };

  // Handle selected chip
  const handleSelect = (index) => {
    switch (currentStep) {
      case 0:
        // For course, single selection
        setActiveIndices(activeIndices.includes(index) ? [] : [index]);
        setCourse(activeIndices.includes(index) ? {} : data[index]);
        break;
      case 1:
        // For class, single selection
        setActiveIndices(activeIndices.includes(index) ? [] : [index]);
        setClass(activeIndices.includes(index) ? {} : data[index]);
        break;
      case 2:
        // For subjects, multi-selection
        if (activeIndices.includes(index)) {
          console.log("index: ", index);
          setSubjects(subjects.filter((_, i) => i !== index));
        } else {
          if (subjects.length === index) {
            console.log("working");
            setSubjects([]);
          }
          if (!subjectExists(subjects, data[index])) {
            setSubjects([...subjects, data[index]]);
          }
        }
        setActiveIndices(
          activeIndices.includes(index)
            ? activeIndices.filter((i) => i !== index)
            : [...activeIndices, index]
        );
        break;
      case 3:
        // For chapters, multi-selection
        setActiveIndices(
          activeIndices.includes(index)
            ? activeIndices.filter((i) => i !== index)
            : [...activeIndices, index]
        );
        setChapters(
          activeIndices.includes(index)
            ? chapters.filter((_, i) => i !== index)
            : [...chapters, data[index]]
        );
        break;
      case 4:
        // For topics, multi-selection
        setActiveIndices(
          activeIndices.includes(index)
            ? activeIndices.filter((i) => i !== index)
            : [...activeIndices, index]
        );
        setTopics(
          activeIndices.includes(index)
            ? topics.filter((_, i) => i !== index)
            : [...topics, data[index]]
        );
        break;
      default:
        break;
    }
  };

  const goToNextStep = () => {
    console.log("Steps length: ", steps.length);
    setActiveIndices([]);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length + 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const getCurrentItems = () => {
    switch (currentStep) {
      case 0:
        return {
          items: data,
          label: "Course",
          id: "courseId",
          name: "courseName",
        };
      case 1:
        return {
          items: data,
          label: "Class",
          id: "classId",
          name: "className",
        };
      case 2:
        return {
          items: data,
          label: "Subject",
          id: "subjectId",
          name: "subjectName",
        };
      case 3:
        return {
          items: data,
          label: "Chapter",
          id: "chapterId",
          name: "chapterName",
        };
      case 4:
        return {
          items: data,
          label: "Topic",
          id: "topicId",
          name: "topicName",
        };
      default:
        return { items: data, label: "Item" };
    }
  };

  // handle pdf download
  const handleDownload = () => generatePDF(targetRef, { filename: "page.pdf" });
  console.log("activeIndices:", activeIndices);
  return (
    <Container maxWidth={"xl"}>
      <Box className="m-4  py-4 justify-center ">
        {/* stepper */}
        <Box className="px-10">
          <ol className="flex">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`flex justify-between  ${
                  index === steps.length - 1 ? "" : "w-screen"
                } items-center ${
                  index < steps.length - 1
                    ? `after:w-full after:h-1 after:border-b after:border-4 after:inline-block`
                    : ""
                } ${
                  index <= currentStep
                    ? "text-[#0C283C] after:border-[#0C283C] dark:after:border-yellow-300"
                    : "after:border-[#0C283C] dark:after:border-[#0a3c6d]"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-12 h-12 sm:p-2 px-2 lg:w-20 lg:p-4 lg:h-20 xl:w-20 xl:h-20 rounded-full ${
                    index <= currentStep
                      ? "bg-blue-900 text-yellow-300"
                      : "bg-[#5fc6c6] text-black"
                  }`}
                >
                  {React.createElement(step.icon, {
                    className: "w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10",
                  })}
                </span>
              </li>
            ))}
          </ol>
        </Box>

        <Box className="flex justify-center items-center px-20">
          <div className="flex items-start w-full  mt-6 mb-4">
            {currentStep > 5 ? (
              <></>
            ) : (
              <div className="  shrink w-80  justify-start">
                <HomeNew
                  currentStep={currentStep}
                  course={course}
                  classes={classes}
                  subjects={subjects}
                  chapters={chapters}
                  topics={topics}
                />
              </div>
            )}

            {currentStep === 5 ? (
              <div className="flex-grow px-8 flex-col justify-center">
                <Center
                  setQuestionData={setQuestionData}
                  setWatermark={setWatermark}
                />
              </div>
            ) : currentStep < 5 ? (
              <div className="flex-grow px-11 justify-center">
                <ItemList
                  {...getCurrentItems()}
                  data={data}
                  handleSelect={handleSelect}
                  activeIndices={activeIndices}
                />
              </div>
            ) : (
              <DownloadPreview
                questionData={questionData}
                targetRef={targetRef}
                watermark={watermark}
              />
            )}
          </div>
        </Box>

        <Box>
          <div className="mt-6 mb-4 flex justify-end w-full px-4 lg:px-12">
            <button
              className={`px-4 md:px-6 py-2 mr-2 rounded-md ${
                currentStep === 0
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#5fc6c6] text-white hover:bg-blue-700"
              }`}
              onClick={goToPreviousStep}
              disabled={currentStep === 0}
            >
              Back
            </button>

            <button
              className={`px-4 md:px-6 py-2 rounded-md ${
                (activeIndices.length > 0 && currentStep < 5) ||
                currentStep >= 5
                  ? "bg-[#5fc6c6] text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={
                (activeIndices.length === 0 && currentStep < 5) ||
                currentStep === 7
                  ? true
                  : false
              }
              onClick={currentStep === 6 ? handleDownload : goToNextStep}
            >
              {currentStep === 6 ? "DOWNLOAD" : "NEXT"}
            </button>
          </div>
        </Box>
      </Box>
    </Container>

    // <div className="flex flex-col items-center">
    //   {/* Stepper */}
    //   <div className="flex flex-col items-center mt-8 px-4  ">
    //     <ol className="flex items-center w-full justify-center">
    //       {steps.map((step, index) => (
    //         <li
    //           key={index}
    //           className={`flex w-full items-center ${
    //             index < steps.length - 1
    //               ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"
    //               : ""
    //           } ${
    //             index <= currentStep
    //               ? "text-[#0C283C] after:border-[#0C283C] dark:after:border-yellow-300"
    //               : "after:border-[#0C283C] dark:after:border-[#0a3c6d]"
    //           }`}
    //         >
    //           <span
    //             className={`flex items-center justify-center w-12 h-12 sm:p-2 px-2 lg:w-20 lg:p-4 lg:h-20 xl:w-20 xl:h-20 rounded-full ${
    //               index <= currentStep
    //                 ? "bg-blue-900 text-yellow-300"
    //                 : "bg-[#5fc6c6] text-black"
    //             }`}
    //           >
    //             {React.createElement(step.icon, {
    //               className: "w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10",
    //             })}
    //           </span>
    //         </li>
    //       ))}
    //     </ol>

    //     <div>
    //       {/* Other components */}
    //       <div className="flex items-start w-full mt-6 mb-4">
    //         {currentStep > 5 ? (
    //           <></>
    //         ) : (
    //           <div className=" flex justify-start">
    //             <HomeNew
    //               currentStep={currentStep}
    //               course={course}
    //               classes={classes}
    //               subjects={subjects}
    //               chapters={chapters}
    //               topics={topics}
    //             />
    //           </div>
    //         )}

    //         {currentStep === 5 ? (
    //           <div className="flex-grow px-8 flex-col justify-center">
    //             <Center
    //               setQuestionData={setQuestionData}
    //               setWatermark={setWatermark}
    //             />
    //           </div>
    //         ) : currentStep < 5 ? (
    //           <div className="flex-grow flex justify-center">
    //             <ItemList
    //               {...getCurrentItems()}
    //               data={data}
    //               handleSelect={handleSelect}
    //               activeIndices={activeIndices}
    //             />
    //           </div>
    //         ) : (
    //           <DownloadPreview
    //             questionData={questionData}
    //             targetRef={targetRef}
    //             watermark={watermark}
    //           />
    //         )}
    //       </div>
    //     </div>

    //     {/* Navigation buttons */}
    //     <div className="mt-6 mb-4 flex justify-between w-full px-4 lg:px-12">
    //       <button
    //         className={`px-4 md:px-6 py-2 mr-2 rounded-md ${
    //           currentStep === 0
    //             ? "bg-gray-400 text-gray-200 cursor-not-allowed"
    //             : "bg-[#5fc6c6] text-white hover:bg-blue-700"
    //         }`}
    //         onClick={goToPreviousStep}
    //         disabled={currentStep === 0}
    //       >
    //         Back
    //       </button>

    //       <button
    //         className={`px-4 md:px-6 py-2 rounded-md ${
    //           (activeIndices.length > 0 && currentStep < 5) || currentStep >= 5
    //             ? "bg-[#5fc6c6] text-white hover:bg-blue-700"
    //             : "bg-gray-400 text-gray-200 cursor-not-allowed"
    //         }`}
    //         disabled={
    //           (activeIndices.length === 0 && currentStep < 5) ||
    //           currentStep === 7
    //             ? true
    //             : false
    //         }
    //         onClick={currentStep === 6 ? handleDownload : goToNextStep}
    //       >
    //         {currentStep === 6 ? "DOWNLOAD" : "NEXT"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Stepper;
