import {
    findCourse, findClass, findSubject, findChapter, findTopic,
    addCourse, addClass, addSubject, addChapter, addTopic, addQuestion
} from "../api"

// post course
const postCourse = async (course_name) => {
    const course = await findCourse(course_name)
    if (course.data) {
        console.log("Course found Id: ", course.data.courseId);
        return course.data.courseId;
    }
    const newCourse = await addCourse(course_name);
    console.log("New course created: ", newCourse.data.courseId);
    return newCourse.data.courseId;
}

// post class
const postClass = async (class_name, course_id) => {
    const cls = await findClass(class_name, course_id);
    if (cls.data) {
        console.log("Class found Id: ", cls.data.classId);
        return cls.data.classId;
    }
    const newClass = await addClass(class_name, course_id);
    console.log("New class created: ", newClass.data.classId);
    return newClass.data.classId;
}

// post subject
const postSubject = async (subject_name, course_id, class_id) => {
    const subject = await findSubject(subject_name, course_id, class_id);
    if (subject.data) {
        console.log("Subject found Id: ", subject.data.subjectId);
        return subject.data.subjectId;
    }
    const newSubject = await addSubject(subject_name, course_id, class_id);
    console.log("New subject created: ", newSubject.data.subjectId);
    return newSubject.data.subjectId;
}

// post chapter
const postChapter = async (chapter_name, course_id, class_id, subject_id) => {
    const chapter = await findChapter(chapter_name, course_id, class_id, subject_id);
    if (chapter.data) {
        console.log("Chapter found Id: ", chapter.data.chapterId);
        return chapter.data.chapterId;
    }
    const newChapter = await addChapter(chapter_name, course_id, class_id, subject_id);
    console.log("New chapter created: ", newChapter.data.chapterId);
    return newChapter.data.chapterId;
}

// post topic
const postTopic = async (topic_name, course_id, class_id, subject_id, chapter_id) => {
    const topic = await findTopic(topic_name, course_id, class_id, subject_id, chapter_id);
    if (topic.data) {
        console.log("Topic found Id: ", topic.data.topicId);
        return topic.data.topicId;
    }
    const newTopic = await addTopic(topic_name, course_id, class_id, subject_id, chapter_id);
    console.log("New topic created: ", newTopic.data.topicId);
    return newTopic.data.topicId;
}

// post question
const postQuestion = async (questionObj, course_id, class_id, subject_id, chapter_id, topic_id) => {
    console.log("questionObject: ", questionObj);
    console.log("courseId: ", course_id);
    console.log("classId: ", class_id);
    console.log("subjectId: ", subject_id);
    console.log("chapterId: ", chapter_id);
    console.log("topicId: ", topic_id);
    console.log("Object: ", {
        ...questionObj,
        course_id,
        class_id,
        subject_id,
        chapter_id,
        topic_id
    });
    const newQuestion = await addQuestion(questionObj,course_id, class_id, subject_id,chapter_id, topic_id);

    console.log("New question created: ", newQuestion.data.questionId);
}

// Main function to save CSV data to DB
export default async function saveCsvToDB(data) {
    for (const element of data) {
        if (element.Course) {
            console.log("element:", element.Course);
            const questionObj = {
                question: element.Question,
                question_type: element.Type,
                question_marks: element.Marks,
                question_source: element.Source,
                question_level: element.Level,
                option: {
                    option1: element.OptionA,
                    option2: element.OptionB,
                    option3: element.OptionC,
                    option4: element.OptionD
                },
                answer: element.Answer,
                is_used: false
            }
            // add course
            const courseId = await postCourse(element.Course);
            // add class
            const classId = await postClass(element.Class, courseId);
            // add subject
            const subjectId = await postSubject(element.Subject, courseId, classId);
            // add chapter
            const chapterId = await postChapter(element.Chapter, courseId, classId, subjectId);
            // add topic
            const topicId = await postTopic(element.Topic, courseId, classId, subjectId, chapterId);
            // add question
            await postQuestion(questionObj, courseId, classId, subjectId, chapterId, topicId);
        }
    }
}























// import {
//     findCourse, findClass, findSubject, findChapter, findTopic,
//     addCourse, addClass, addSubject, addChapter, addTopic, addQuestion
// } from "../api"
// // post course
// const postCourse = async (course_name) => {
//     const course = await findCourse(course_name)
//     if (course.data) {
//         // return courseId
//         return console.log("course found Id: ", course.data.courseId);
//     }
//     // create new course
//     const newCourse = await addCourse(course_name);
//     console.log("new course created: ", newCourse);

// }
// // post class
// const postClass = (class_name, course_id) => { }
// // post subject
// const postSubject = (subject_name, course_id, class_id) => { }
// // post chapter
// const postChapter = (chapter_name, course_id, class_id, subject_id) => { }
// // post topic
// const postTopic = (topic_name, course_id, class_id, subject_id, chapter_id) => { }
// // post question
// const postQuestion = (topic_name, course_id, class_id, subject_id, chapter_id, topic_id) => { }


// export default async function saveCsvToDB(data) {

//     data.forEach(element => {
//         if (element.Course) {
//             const QuestionObj = {
//                 question: element.Question,
//                 question_type: element.Type,
//                 question_marks: element.Marks,
//                 question_source: element.Source,
//                 question_level: element.Level,
//                 option: {
//                     option1: element.OptionA,
//                     option2: element.OptionB,
//                     option3: element.OptionC,
//                     option4: element.OptionD
//                 },
//                 answer: element.Answer,
//                 is_used: false
//             }
//             // add course
//             postCourse(element.Course)
//             // add class
//             // add subject
//             // add chapter
//             // add topic
//             // question
//             // console.log("Course: ", element.Course);
//             // console.log("Class: ", element.Class);
//             // console.log("Subject: ", element.Subject);
//             // console.log("Topic: ", element.Topic);
//             // console.log("question: ", QuestionObj);

//         }

//     });

// }