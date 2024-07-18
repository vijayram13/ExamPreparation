import React, { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { addCourse, addClass, addSubject, addChapter, addTopic } from "../api";

import Fruit from "../component/Fruit";
const List = ({
  items,
  label,
  id,
  course,
  classes,
  subject,
  chapter,
  topic,
  name,
  handleSelect,
  activeIndex,
  setData,
  currentStep,
}) => {
  // const [list, setList] = useState(items);
  const [newItem, setNewItem] = useState("");
  const [subjects, setSubject] = useState([]);

  const [allFruits, setAllFruits] = useState([
    { id: 1, name: "apple" },
    { id: 2, name: "mango" },
    { id: 3, name: "grapes" },
  ]);
  const [selectedFruits, setSelectedFruits] = useState([]);

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
          setData([...items, newCourse]);
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
          setData([...items, newClass]);
          setNewItem(""); // Clear input field after adding
        }
        break;
      }
      // add subject
      case 2: {
        // console.log("Add Subject:" + currentStep);
        if (newItem.trim() !== "") {
          const subject = await addSubject(
            newItem,
            course.courseId,
            classes.classId
          );
          // const message = subject.data.message;
          delete subject.data.message;
          const newClass = subject.data;
          setData([...items, newClass]);
          setNewItem("");
        }
        break;
      }
      // add chapter
      case 3: {
        // console.log("Add Chapter: " + currentStep);
        if (newItem.trim() !== "") {
          const chapter = await addChapter(
            newItem,
            course.courseId,
            classes.classId,
            subject.subjectId
          );
          // const message = chapter.data.message;
          delete chapter.data.message;
          const newClass = chapter.data;
          setData([...items, newClass]);
          setNewItem(""); // Clear input field after adding
        }
        break;
      }
      // add topic
      case 4: {
        // console.log("Add Topic: " + currentStep);
        if (newItem.trim() !== "") {
          const topic = await addTopic(
            newItem,
            course.courseId,
            classes.classId,
            subject.subjectId,
            chapter.chapterId
          );
          // const message = topic.data.message;
          delete topic.data.message;
          const newClass = topic.data;
          setData([...items, newClass]);
          setNewItem(""); // Clear input field after adding
        }
        break;
      }
    }
  };

  const handleSelection = (index) => {
    // const item = subjects.find((item) => item.subjectId === id);

    // if (item) {
    //   console.log("Item: ", subjects);
    //   const newSubjects = subjects.filter(
    //     (subject) => subject.subjectId !== id
    //   );
    //   setSubject(newSubjects)
    // } else {
    //   const newItem = items.find((item) => item.subjectId === id);
    //   setSubject(...subjects, newItem)
    // }

    // if (!subjectId.includes(id)) {
    //   subjectId.push(id);
    // }
    // else {
    //   subjectId.filter()
    // }
    // console.log("subjectId: ",subjectId);
    // console.log("id: " + id);
    handleSelect(index);
  };

  const handleClick = (id) => {
    let arr = selectedFruits;
    if (arr.includes(id)) {
      arr = arr.filter((fruit) => fruit != id);
    }
    else{
      arr.push(id);
    }
    setSelectedFruits(arr);
    console.log("arr: ",arr);
  };

  return (
    // <div>
    //   {allFruits.map((fruit, index) => (
    //     <Fruit
    //       fruit={fruit}
    //       selectedFruits={selectedFruits}
    //       handleClick={handleClick}
    //     />
    //   ))}
    // </div>

    <div className=" rounded-lg  p-6 shadow-md">
      <div className="flex  justify-between items-center mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Enter new ${label}`}
          className="flex-1 p-2 mr-2 text-gray-600 focus:outline-none border border-gray-300 rounded-lg"
        />
        <button
          className="bg-[#5fc6c6] px-4 py-2 rounded-lg text-white hover:bg-[#4ea8a8] focus:outline-none"
          onClick={handleAddItem}
        >
          Search {label}
        </button>
      </div>
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <Chip
            label={item[name] &&item[name][0].toUpperCase()+item[name].slice(1)}
            // key={index}
            key={item[id]}
            // color="secondary"
            variant="filled"
            sx={{
              margin: 0.5,
              fontSize: 15,
              fontWeight: "semibold",
              color: activeIndex === index ? "#0D47A1" : "white",
              backgroundColor: activeIndex === index ? "yellow" : "#0D47A1",
              "&:hover": {
                backgroundColor: activeIndex === index ? "yellow" : "grey", // Disable hover effect by keeping the background color the same
              },
            }}
            onClick={() => handleSelection(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
