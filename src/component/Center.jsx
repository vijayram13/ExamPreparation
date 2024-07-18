import React, { useEffect, useState } from "react";
import QuestionFilter from "./QuestionFilter";
import EditableDropdown from "./newComponent/EditableDropDown";
import { Box } from "@mui/material";
import { getAllQuestions } from "../api";
import parse from "html-react-parser";
// for options
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const Quiz = ({
  setQuestionData,
  setWatermark,
  section,
  setSection,
  selectedCourse,
  selectedClasses,
  selectedSubject,
  selectedChapter,
  selectedTopic,
}) => {
  const [questions, setQuestion] = useState([]);
  const [mark, setMark] = useState("");

  const [checkedItems, setCheckedItems] = useState({});
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleChange = (event) => {
    if (Object.keys(section).length) {
      const { name, checked } = event.target;
      setCheckedItems({ ...checkedItems, [name]: checked });
    } else {
      alert("First create the section");
    }
  };
  // Define state to keep track of checkbox status
  const handleInputChange = (e) => {
    setMark(e.target.value);
  };

  const handleButtonClick = () => {
    setWatermark(mark);
  };

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    setIsSelectAll(checked);
    const newCheckedItems = {};
    questions.forEach((item) => {
      newCheckedItems[item.questionId] = checked;
    });

    setCheckedItems(newCheckedItems);
  };

  // fetch classes
  const fetchAllQuestions = async () => {
    try {
      console.log("selected Course: ", selectedCourse);
      console.log("selected Class: ", selectedClasses);
      console.log("selected Subject: ", selectedSubject);
      console.log("selected Chapter: ", selectedChapter);
      console.log("selected Topic: ", selectedTopic);
      const result = await getAllQuestions(
        selectedCourse,
        selectedClasses,
        selectedSubject,
        selectedChapter,
        selectedTopic
      );
      const questions = result.data;

      // console.log("questions: " + JSON.stringify(questions));
      setQuestion(questions);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    if (Object.keys(section).length) {
      const selectedQuestionIds = Object.keys(checkedItems).filter(
        (key) => checkedItems[key]
      );

      const sectionName = Object.keys(section);
      // questionId
      const questionIdsToSave = selectedQuestionIds.map((key) =>
        parseInt(key, 10)
      );

      setSection({
        [sectionName]: questionIdsToSave,
      });
      const filterQuestion = questions.filter((question) =>
        questionIdsToSave.includes(question.questionId)
      );
      setQuestionData(filterQuestion);
    }
  }, [checkedItems]);

  return (
    <div className="h-screen overflow-hidden  flex flex-col md:flex-row">
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#185179] scrollbar-track-[#00366C] flex-grow">
        <div className="p-6 space-y-6">
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={isSelectAll}
                id="select"
                onChange={handleSelectAll}
                className="w-5 h-5"
              />
              <label htmlFor="select">Select All</label>
            </div>
            {/* watermark */}
            {/* <Box display="flex" alignItems="center">
              <input
                type="text"
                name="watermark"
                placeholder="Watermark"
                className="p-2 rounded-s-md"
                value={mark}
                onChange={handleInputChange}
              />
              <button
                className="p-2 bg-blue-500 rounded-e-md"
                onClick={handleButtonClick}
              >
                Add
              </button>
            </Box> */}

            <Box display="flex" alignItems="center">
              <EditableDropdown section={section} setSection={setSection} />
            </Box>
            <QuestionFilter />
          </div>

          {questions.map((item, index) => (
            // box
            <div
              key={index}
              className="flex border-gray-50 divide-x-2 divide-white border-solid border-2 rounded"
            >
              {/* checkbox */}
              <div className="flex justify-stretch justify-items-center place-items-center p-2">
                <input
                  type="checkbox"
                  id={item.questionId}
                  name={item.questionId}
                  className="mr-2 w-4 h-4 cursor-pointer"
                  checked={checkedItems[item.questionId] || false}
                  onChange={handleChange}
                />
              </div>

              {/* question box*/}
              <label
                htmlFor={item.questionId}
                className="text-cyan-50 px-3 w-[100%]"
              >
                {/* question and marks */}
                <div className="flex justify-between mb-2">
                  <div className="text-md font-medium ">
                    {parse(item.question)}
                  </div>
                  <div className="font-semibold text-red-600">{item.marks}</div>
                </div>
                {/* options */}
                <div className="flex justify-start flex-wrap ">
                  <ul className="list-none flex flex-col md:flex-row md:justify-between items-start md:items-center">
                    {Object.entries(JSON.parse(item.option)).map(
                      ([key, value], idx) => (
                        <li key={idx} className="text-md  pe-1  ">
                          {value.length ? (
                            <p>
                              <span className="text-red-600 font-bold ">
                                {letters[idx]}.
                              </span>{" "}
                              {parse(value)}
                            </p>
                          ) : (
                            <span></span>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                {/* correct answer */}
                <div className="flex mt-3">
                  <p>
                    <span className="font-bold text-red-600">Answer: </span>{" "}
                    {item.answer}
                  </p>
                </div>
                {/* type level source */}
                <div className="flex justify-between mb-3">
                  <p>
                    <span className="font-bold text-red-600">Type: </span>
                    {item.type}
                  </p>
                  {/* <p>{item.level}</p> */}
                  <p>
                    <span className="font-bold text-red-600">Level: </span>
                    {item.level}
                  </p>
                  <p>
                    <span className="font-bold text-red-600">Source: </span>
                    {item.source}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Custom Scrollbar on the right side */}
      <div className="m-4 w-2 mr-4 flex-shrink-0">
        {/* Spacer for scrollbar positioning */}
        <div className="absolute inset-y-0 right-0 w-1"></div>
      </div>
    </div>
  );
};

export default Quiz;
