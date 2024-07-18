// main file

import React, { useState, useEffect } from "react";
import { Grid, Stack, Button } from "@mui/material";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

import {
  FaGraduationCap,
  FaBook,
  FaClipboardList,
  FaFileUpload,
} from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { GiTeacher, GiNotebook } from "react-icons/gi";

import Home from "./Home";
import ItemList from "./ItemList";

import DownloadPreview from "./DownloadPreview";
import Center from "./Center";
import {
  getCourses,
  getClasses,
  getSubjects,
  getChapters,
  getTopics,
} from "../api";
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
  const [activeIndex, setActiveIndex] = useState(null);
  const [watermark, setWatermark] = useState("Watermark");
  // to download pdf
  const targetRef = useRef();
  // store the value of the current step
  const [course, setCourse] = useState({});
  const [classes, setClass] = useState({});
  const [subject, setSubject] = useState({});
  const [chapter, setChapter] = useState({});
  const [topic, setTopic] = useState({});

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
      const result = await getChapters(subject.subjectId);

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
      const result = await getTopics(chapter.chapterId);
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
  }, [
    currentStep,
    // fetchCourses,
    // fetchSubjects,
    // fetchClasses,
    // fetchChapters,
    // fetchTopics,
  ]);

  // handle selected chip
  const handleSelect = (index) => {
    if (activeIndex === index) {
      // If the clicked button is already active, deactivate it
      setActiveIndex(null);
      

      // to prevent from activeindex change
      if (currentStep === 0) setCourse({});
      if (currentStep === 1) setClass({});
      if (currentStep === 2) setSubject({});
      if (currentStep === 3) setChapter({});
      if (currentStep === 4) setTopic({});
    } else {
      // Otherwise, set the clicked button as active
      setActiveIndex(index);
      if (currentStep === 0) {
        // console.log("Selected course: ",data[index]);
        setCourse(data[index]);
      } else if (currentStep === 1) {
        setClass(data[index]);
      } else if (currentStep === 2) {
        console.log("Data:",data[index]);
        setSubject(data[index]);
      } else if (currentStep === 3) {
        setChapter(data[index]);
      } else if (currentStep === 4) {
        setTopic(data[index]);
      }
    }
  };

  const goToNextStep = () => {
    console.log("Steps length: ", steps.length);
    setActiveIndex(null);
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

  return (
    <div className="flex flex-col items-center">
      

      {/* Stepper */}
      <div className="flex flex-col items-center mt-8 px-4 w-full ">
        <ol className="flex items-center w-full justify-center">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`flex w-full items-center ${
                index < steps.length - 1
                  ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"
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

        <div>
          {/* Other components */}
          <div className="flex items-start w-full mt-6 mb-4">
            {currentStep > 5 ? (
              <></>
            ) : (
              <div className=" flex justify-start">
                <Home
                  currentStep={currentStep}
                  course={course}
                  classes={classes}
                  subject={subject}
                  chapter={chapter}
                  topic={topic}
                />
              </div>
            )}

            {currentStep === 5 ? (
              <div className="flex-grow px-8 flex-col justify-center">
                <Center setQuestionData={setQuestionData} setWatermark={setWatermark}/>
              </div>
            ) : currentStep < 5 ? (
              <div className="flex-grow flex justify-center">
                <ItemList
                  {...getCurrentItems()}
                  data={data}
                  handleSelect={handleSelect}
                  activeIndex={activeIndex}
                />
              </div>
            ) : (
              <DownloadPreview
                questionData={questionData}
                targetRef={targetRef}
                watermark = {watermark}
              />
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 mb-4 flex justify-between w-full px-4 lg:px-12">
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
              (activeIndex !== null && currentStep < 5) || currentStep >= 5
                ? "bg-[#5fc6c6] text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={
              (activeIndex === null && currentStep < 5) || currentStep === 7
                ? true
                : false
            }
            onClick={currentStep === 6 ? handleDownload : goToNextStep}
          >
            {currentStep === 6 ? "DOWNLOAD" : "NEXT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
