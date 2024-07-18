// src/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your backend URL
  // baseURL: 'https://api-ps.hemsidaavt.com', // Replace with your backend URL
});

// ===================== Courses API =================//
// add course
export const addCourse = async(courseName) => api.post('/addCourse', { course_name: courseName })
// get course
export const getCourses = async() => api.get('/courses');
// find course by coursename
export const findCourse = async(courseName) => api.get(`/courses/${courseName}`);


// ===================== Classes API =================//
// add class
export const addClass = async(className, course_id) => api.post(`/addClass?course_id=${course_id}`, { class_name: className });
// get class
export const getClasses = async(courseId) => api.get(`/classes?courseId=${courseId}`);
// find class by classname
export const findClass = async(className,course_id) => api.get(`/classes/${className}?course_id=${course_id}`);

// ===================== Subject API =================//
// add subject
export const addSubject = async(subjectName, course_id, class_id) => api.post(`/addsubject?course_id=${course_id}&class_id=${class_id}`, { subject_name: subjectName });
// get subject
export const getSubjects = async(classId) => api.get(`/subjects?classId=${classId}`);
// find subject by subjectname 
export const findSubject = async(subjectName) => api.get(`/subjects/${subjectName}`);


// ===================== Chapter API =================//
// add chapter
export const addChapter = async(chapterName, course_id, class_id,subject_id) => api.post(`/addchapter?course_id=${course_id}&class_id=${class_id}&subject_id=${subject_id}`, { chapter_name: chapterName });
// get chapter
export const getChapters = async(subjectId) => api.get(`/chapters?subjectId=[${subjectId}]`);
// find chapter by chaptername 
export const findChapter = async(chapterName) => api.get(`/chapters/${chapterName}`);




// ===================== Topic API =================//
// add topic
export const addTopic = async(topicName, course_id, class_id, subject_id,chapter_id) => api.post(`/addtopic?course_id=${course_id}&class_id=${class_id}&subject_id=${subject_id}&chapter_id=${chapter_id}`, { topic_name: topicName });
// get topic
export const getTopics = async(chapterId) => api.get(`/topics?chapterId=[${chapterId}]`);
// find topic by topicname 
export const findTopic = async(topicName) => api.get(`/topics/${topicName}`);



// ===================== Question API =================//
//get  questions
export const getAllQuestions = async(courseId,classId,subjectId,chapterId,topicId) => api.get(`/questions?courseId=[${courseId}]&classId=[${classId}]&subjectId=[${subjectId}]&chapterId=[${chapterId}]&topicId=[${topicId}]`);
// add question
export const addQuestion = async(questionObj, course_id, class_id, subject_id,chapter_id, topic_id) => api.post(`/addquestion?course_id=${course_id}&class_id=${class_id}&subject_id=${subject_id}&chapter_id=${chapter_id}&topic_id=${topic_id}`, questionObj);