import { useState } from "react";
const TopicComponent = ({ topic, selectedTopic, handleTopic }) => {
  const [render, setRender] = useState(1);
  return (
    <>
      {topic.length &&
        topic.map((item, index) => (
          <button
            key={index}
            className={`${
              selectedTopic.includes(item.topicId)
                ? "bg-red-600"
                : "bg-blue-600 "
            } me-2 mt-2 p-1 text-center text-white rounded-full min-w-20 `}
            onClick={() => {
              handleTopic(selectedTopic, item.topicId);
              setRender(render + 1);
            }}
          >
            {item.topicName}
          </button>
        ))}
    </>
  );
};

export default TopicComponent;
