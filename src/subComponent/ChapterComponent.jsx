import { useState } from "react";
const ChapterComponent = ({ chapter, selectedChapter, handleChapter }) => {
  const [render, setRender] = useState(1);
    return (
      <>
        {chapter.length &&
          chapter.map((item, index) => (
            <button
              key={index}
              className={`${
                selectedChapter.includes(item.chapterId)
                  ? "bg-red-600"
                  : "bg-blue-600 "
              } me-2 mt-2 p-1 text-center text-white rounded-full min-w-20 `}
              onClick={() => {
                handleChapter(selectedChapter, item.chapterId);
                setRender(render+1);
              }}
            >
              {item.chapterName}
            </button>
          ))}
      </>
    );
  };
  
  export default ChapterComponent;
  