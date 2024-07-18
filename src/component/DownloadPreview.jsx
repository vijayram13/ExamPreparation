import { Box, Divider, Typography, Stack } from "@mui/material";
import parse from "html-react-parser";
// for options
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const title = "मराठी यवकभारती : स्मार्ट उत्तरे [२०२२-२३] [F-601]";

const subtitle1 = "वेळ : ३ तास";
const subtitle2 = "इयत्ता : १२ वी";
const subtitle3 = "गुण : ८०";
export default function QuestionListComponent({
  questionData,
  targetRef,
  watermark,
}) {
  return (
    <Box
      ref={targetRef}
      sx={{ padding: 3, bgcolor: "white", overflow: "hidden", width: "100%" }}
    >
      {/* title */}
      <Stack>
        <Box
          contentEditable
          suppressContentEditableWarning={true}
          style={{
            textAlign: "center",
            fontFamily: "Tiro Devanagari Marathi",
            fontWeight: "900",
            fontSize: "2.125rem", // equivalent to variant="h4"
            marginBottom: "0.35em", // equivalent to gutterBottom
          }}
        >
          {title}
        </Box>
      </Stack>
      {/* subtitle */}
      <Stack direction={"row"} justifyContent="space-between">
        <Typography
          fontFamily={"Tiro Devanagari Marathi"}
          variant="subtitle2"
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"1rem"}
          gutterBottom
          contentEditable
          suppressContentEditableWarning={true}
        >
          {subtitle1}
        </Typography>
        <Typography
          contentEditable
          suppressContentEditableWarning={true}
          fontFamily={"Tiro Devanagari Marathi"}
          variant="subtitle2"
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"1rem"}
          gutterBottom
        >
          {subtitle2}
        </Typography>
        <Typography
          contentEditable
          suppressContentEditableWarning={true}
          fontFamily={"Tiro Devanagari Marathi"}
          variant="subtitle2"
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"1rem"}
          gutterBottom
        >
          {subtitle3}
        </Typography>
      </Stack>
      {/* Divider line */}
      <Box sx={{ height: "2px", bgcolor: "black" }}></Box>
      {/* Section */}
      <Box border={1} padding={1} marginTop={2} marginBottom={4}>
        <Typography
          contentEditable
          suppressContentEditableWarning={true}
          fontFamily={"Tiro Devanagari Marathi"}
          variant="subtitle2"
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"1rem"}
        >
          विभाग १ : गद्य ( गण २० )
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-45deg)",
            fontSize: "3rem",
            fontFamily: "Tiro Devanagari Marathi",
            wordSpacing: "3rem",
            color: "rgba(0, 0, 0, 0.3)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {watermark}
        </Box>

        {/* questions */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
        >
          {/* Question list  */}
          {questionData.map((item, index) => (
            // box
            <div key={index} className="flex">
              {/* question box*/}
              <label htmlFor={item.questionId}>
                {/* question and marks */}
                <div className="flex justify-between">
                  <div className="text-md font-medium">
                    <span className="pe-2">{index + 1}.</span>

                    {parse(item.question)}
                  </div>
                  <div className="font-semibold text-red-600">
                    [ {item.marks} ]
                  </div>
                </div>
                {/* options */}
                <div className="flex justify-around flex-wrap mt-3 px-4">
                  <ul className="list-none flex flex-wrap flex-col md:flex-row md:justify-between items-start md:items-center">
                    {Object.entries(JSON.parse(item.option)).map(
                      ([key, value], idx) => (
                        <li key={idx} className="text-md mb-2 pe-1  md:mb-0">
                          {value.length ? (
                            <p>
                              <span className="text-red-600 font-bold ">
                                {letters[idx]}.
                              </span>{" "}
                              {parse(value)}
                              
                            </p>
                          ) : (
                            ""
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </label>
            </div>
          ))}
        </Box>
        <Box>
          <Divider color={"warning"} sx={{ marginY: "15px" }} />
          <p className="text-center">ALL THE BEST</p>
        </Box>
      </Box>
    </Box>
  );
}
