import Dropdown from "react-multilevel-dropdown";
import { useState } from "react";
import { TbBackground } from "react-icons/tb";
export default function QuestionFilter() {
  const [filter, setFilter] = useState("");
  // filter question by marks
  const filterQuestionByMarks = (mark) => {
    // TODO: set question by mark
    console.log(mark);
  };
  // filter question by type
  const filterQuestionByType = (type) => {
    // TODO: set question by type
    console.log(type);
  };

  // for both used and unused
  const filterQuestionByUsed = (used) => {
    // Todo: set question by used
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Dropdown position="left" buttonVariant ={'special'} title="filter" openOnHover>
      <Dropdown.Item onClick={() => handleChange()}>Item 1</Dropdown.Item>
      <Dropdown.Item>
        Item 2
        <Dropdown.Submenu>
          <Dropdown.Item>Subitem 1</Dropdown.Item>
        </Dropdown.Submenu> 
      </Dropdown.Item>
    </Dropdown>
  );
}
