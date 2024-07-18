import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Filter from "./Filter";
import { useEffect, useState } from "react";

import {
  api,
  getCourses,
  getClasses,
  getSubjects,
  getChapters,
  getTopics,
} from "../api";

import Course from "./Filter/Course";
import Class from "./Filter/Class";
import Subject from "./Filter/Subject";
import Chapter from "./Filter/Chapter";
import Topic from "./Filter/Topic";

import AuthComponent from "./authComponent/AuthComponent";

const listItem = ["Course", "Class", "Subject", "Chapter", "Topic"];
const HomeComponent = () => {
  const [index, setIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);

  const [course, setCourse] = useState({});
  const [classess, setClassess] = useState({});
  const [subject, setSubject] = useState({});
  const [chapter, setChapter] = useState({});
  const [topic, setTopic] = useState({});

  // courses
  const getCourse = async () => {
    try {
      const course = await getCourses();

      const updatedCourses = await Promise.all(
        course.data.map(async (element) => {
          const questionCount = await api.get(
            `/questions/count?courseId=${element.courseId}`
          );
          // console.log(element.courseId, element.courseName, questionCount);
          return { ...element, questionCount: questionCount.data }; // Assuming `questionCount` has a `data` field
        })
      );
      // console.log(updatedCourses);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error fetching courses or question count:", error);
    }
  };

  // get classes
  const getClass = async () => {
    try {
      console.log("course: " + course.courseId);
      const classes = await getClasses(course.courseId);

      const updatedClasses = await Promise.all(
        classes.data.map(async (element) => {
          const questionCount = await api.get(
            `/questions/count?classId=${element.classId}`
          );
          console.log(element.classId, element.className, questionCount);
          return { ...element, questionCount: questionCount.data }; // Assuming `questionCount` has a `data` field
        })
      );
      console.log(updatedClasses);
      setClasses(updatedClasses);
    } catch (error) {
      console.error("Error fetching classes or question count:", error);
    }
  };

  // get subjects
  const getSubject = async () => {
    try {
      console.log("classId: " + classess.classId);
      const subject = await getSubjects(classess.classId);

      const updatedSubjects = await Promise.all(
        subject.data.map(async (element) => {
          const questionCount = await api.get(
            `/questions/count?subjectId=${element.subjectId}`
          );
          console.log(element.subjectId, element.subjectName, questionCount);
          return { ...element, questionCount: questionCount.data }; // Assuming `questionCount` has a `data` field
        })
      );
      console.log(updatedSubjects);
      setSubjects(updatedSubjects);
    } catch (error) {
      console.error("Error fetching subject or question count:", error);
    }
  };

  // get chapters
  const getChapter = async () => {
    try {
      const chapter = await getChapters(subject.subjectId);

      const updatedChapters = await Promise.all(
        chapter.data.map(async (element) => {
          const questionCount = await api.get(
            `/questions/count?chapterId=${element.chapterId}`
          );
          console.log(element.chapterId, element.chapterName, questionCount);
          return { ...element, questionCount: questionCount.data }; // Assuming `questionCount` has a `data` field
        })
      );
      console.log(updatedChapters);
      setChapters(updatedChapters);
    } catch (error) {
      console.error("Error fetching classes or question count:", error);
    }
  };

  // get topics
  const getTopic = async () => {
    try {
      const topic = await getTopics(chapter.chapterId);

      const updatedTopics = await Promise.all(
        topic.data.map(async (element) => {
          const questionCount = await api.get(
            `/questions/count?topicId=${element.topicId}`
          );
          console.log(element.topicId, element.topicName, questionCount);
          return { ...element, questionCount: questionCount.data }; // Assuming `questionCount` has a `data` field
        })
      );
      console.log(updatedTopics);
      setTopics(updatedTopics);
    } catch (error) {
      console.error("Error fetching classes or question count:", error);
    }
  };

  useEffect(() => {
    if (index === 0) {
      getCourse();
    } else if (index === 1) {
      getClass();
    } else if (index === 2) {
      getSubject();
    } else if (index === 3) {
      getChapter();
    } else if (index === 4) {
      getTopic();
    }
  }, [index]);

  return (
    // <>
    // <AuthComponent/>
    // </>
    <>
    
      <Container>
        {/* chips */}
        <Box>
          <Stack
            className="flex flex-wrap ms-7 p-2"
            direction={"row"}
            spacing={2}
          >
            {listItem.map((item, index) => (
              <Chip
                key={index}
                variant="outlined"
                sx={{
                  fontSize: "1rem",
                  color: "white",
                  padding: "10px",
                  ":hover": { bgcolor: "turquoise" },
                }}
                label={
                  index === 0 && course.courseName !== undefined
                    ? course.courseName.toUpperCase()
                    : index === 1 && classess.className !== undefined
                    ? classess.className.toUpperCase()
                    : index === 2 && subject.subjectName !== undefined
                    ? subject.subjectName.toUpperCase()
                    : index === 3 && chapter.chapterName !== undefined
                    ? chapter.chapterName.toUpperCase()
                    : index === 4 && topic.topicName !== undefined
                    ? topic.topicName.toUpperCase()
                    : item
                }
                clickable
                onClick={() => {
                  setIndex(index);
                }}
              ></Chip>
            ))}
          </Stack>
          {/* container */}
          <Box
            className="bg-blue-200 m-5 rounded-md bg-opacity-10"
            sx={{ minHeight: "70vh" }}
          >
            <Stack direction={"row"} justifyContent={"flex-end"}>
              {/* <Box className="w-fit">
                <Filter />
              </Box> */}
            </Stack>
            {/* category */}
            {index === 0 && <Course courses={courses} setCourse={setCourse} />}
            {index === 1 && (
              <Class classes={classes} setClassess={setClassess} />
            )}
            {index === 2 && (
              <Subject subjects={subjects} setSubject={setSubject} />
            )}
            {index === 3 && (
              <Chapter chapters={chapters} setChapter={setChapter} />
            )}
            {index === 4 && <Topic topics={topics} setTopic={setTopic} />}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomeComponent;
