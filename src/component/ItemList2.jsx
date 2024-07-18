import React, { useState, useEffect } from "react";
import { addCourse, addClass, addSubject, addChapter, addTopic } from "../api";

import CourseComponent from "../subComponent/CourseComponent";
import ClassComponent from "../subComponent/ClassComponent";
import SubjectComponent from "../subComponent/SubjectComponent";
import ChapterComponent from "../subComponent/ChapterComponent";
import TopicComponent from "../subComponent/TopicComponent";

const List = ({
  currentStep,
  setIsButtonDisabled,
  // course
  course,
  selectedCourse,
  setSelectedCourse,
  // class
  classes,
  selectedClasses,
  setSelectedClass,
  // subject
  subject,
  selectedSubject,
  setSelectedSubject,
  // chapter
  chapter,
  selectedChapter,
  setSelectedChapter,
  // topic
  topic,
  selectedTopic,
  setSelectedTopic,
}) => {
  //   console.log("Course: " + JSON.stringify(course));
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setIsButtonDisabled(isButtonDisable());
  }, [
    selectedCourse,
    selectedClasses,
    selectedSubject,
    selectedChapter,
    selectedTopic,
    currentStep,
  ]);

  const handleAddItem = async () => {
    // TODO: set course implement
    switch (currentStep) {
      // add course
      case 0: {
        // console.log("Course: " + course);
        if (newItem.trim() !== "") {
          const course = await addCourse(newItem);
          // const message = course.data.message;
          delete course.data.message;
          const newCourse = course.data;
          setNewItem(""); // Clear input field after adding
        }
        break;
      }
      // add class
      case 1: {
        // console.log("Course: " + course.courseId);
        // console.log("Add Class:" + currentStep);

        if (newItem.trim() !== "") {
          const classes = await addClass(newItem, course.courseId);
          // const message = classes.data.message;
          delete classes.data.message;
          const newClass = classes.data;
          setNewItem(""); // Clear input field after adding
        }
        break;
      }
      //   // add subject
      //   case 2: {
      //     // console.log("Add Subject:" + currentStep);
      //     if (newItem.trim() !== "") {
      //       const subject = await addSubject(
      //         newItem,
      //         course.courseId,
      //         classes.classId
      //       );
      //       // const message = subject.data.message;
      //       delete subject.data.message;
      //       const newClass = subject.data;
      //       setNewItem("");
      //     }
      //     break;
      //   }
      //   // add chapter
      //   case 3: {
      //     // console.log("Add Chapter: " + currentStep);
      //     if (newItem.trim() !== "") {
      //       const chapter = await addChapter(
      //         newItem,
      //         course.courseId,
      //         classes.classId,
      //         subject.subjectId
      //       );
      //       // const message = chapter.data.message;
      //       delete chapter.data.message;
      //       const newClass = chapter.data;
      //       setNewItem(""); // Clear input field after adding
      //     }
      //     break;
      //   }
      //   // add topic
      //   case 4: {
      //     // console.log("Add Topic: " + currentStep);
      //     if (newItem.trim() !== "") {
      //       const topic = await addTopic(
      //         newItem,
      //         course.courseId,
      //         classes.classId,
      //         subject.subjectId,
      //         chapter.chapterId
      //       );
      //       // const message = topic.data.message;
      //       delete topic.data.message;
      //       const newClass = topic.data;
      //       setNewItem(""); // Clear input field after adding
      //     }
      //     break;
      //   }
    }
  };

  const isButtonDisable = () => {
    switch (currentStep) {
      case 0:
        return selectedCourse.length === 0;
      case 1:
        return selectedClasses.length === 0;
      case 2:
        return selectedSubject.length === 0;
      case 3:
        return selectedChapter.length === 0;
      case 4:
        return selectedTopic.length === 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  //   for course and class
  const handleSelection = (selectedArr, id) => {
    let arr = selectedArr;
    if (arr.length && arr.includes(id)) {
      arr = [];
    } else {
      arr = [];
      arr.push(id);
    }
    if (currentStep === 0) {
      setSelectedCourse(arr);
    } else {
      setSelectedClass(arr);
    }
    setIsButtonDisabled(isButtonDisable());
    console.log("arr: ", arr);
  };
  // for subject chapter topic
  const handleMultipleSelection = (selectedArr, id) => {
    let arr = selectedArr;
    if (arr.includes(id)) {
      arr = arr.filter((itemId) => itemId != id);
    } else {
      arr.push(id);
    }
    // subjects
    if (currentStep === 2) {
      setSelectedSubject(arr);
      // chapters
    } else if (currentStep === 3) {
      setSelectedChapter(arr);
      // topic
    } else if (currentStep === 4) {
      setSelectedTopic(arr);
    }
    setIsButtonDisabled(isButtonDisable);
    console.log("arr: ", arr);
  };

  return (
    <div className=" rounded-lg  p-6 shadow-md">
      <div className="flex  justify-between items-center mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Enter new course`}
          className="flex-1 p-2 mr-2 text-gray-600 focus:outline-none border border-gray-300 rounded-lg"
        />
        <button
          className="bg-[#5fc6c6] px-4 py-2 rounded-lg text-white hover:bg-[#4ea8a8] focus:outline-none"
          onClick={handleAddItem}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap">
        {/* course */}
        {currentStep === 0 && (
          <CourseComponent
            course={course}
            selectedCourse={selectedCourse}
            handleCourse={handleSelection}
          />
        )}
        {/* class */}
        {currentStep === 1 && (
          <ClassComponent
            classes={classes}
            selectedClasses={selectedClasses}
            handleClasses={handleSelection}
          />
        )}
        {/* subject */}
        {currentStep === 2 && (
          <SubjectComponent
            subject={subject}
            selectedSubject={selectedSubject}
            handleSubject={handleMultipleSelection}
          />
        )}
        {currentStep === 3 && (
          <ChapterComponent
            chapter={chapter}
            selectedChapter={selectedChapter}
            handleChapter={handleMultipleSelection}
          />
        )}
        {currentStep === 4 && (
          <TopicComponent
            topic={topic}
            selectedTopic={selectedTopic}
            handleTopic={handleMultipleSelection}
          />
        )}
      </div>
    </div>
  );
};

export default List;
