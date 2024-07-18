import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Chip,
  FormControl,
  Box,
  Grid,
  Radio,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import TextEditor from "./TextEditor";

import { useState } from "react";
export default function CreateQuestionComponent({
  setQuestion,
  setOptionA,
  setOptionB,
  setOptionC,
  setOptionD,
  setCorrectAnswer,
  setMarks,
  setQuestionType,
  setDifficultyLevel,
  setQuestionSource,
}) {
  const [quesLevel, setQuesLevel] = useState("");
  const [quesType, setQuesType] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [answer, setAnswer] = useState("");

  // handle answers change
  const handleAnswerChange = (event) => {
    // console.log(event.target.value);
    setAnswer(event.target.value);
    setCorrectAnswer(event.target.value);
  };

  // handle Marks change
  const handleMarkChange = (event) => {
    // console.log(event.target.value)
    setMarks(event.target.value);
  };
  // handle type change
  const handleQuestionType = (event) => {
    // console.log(event.target.value)
    setQuesType(event.target.value);
    setQuestionType(event.target.value);
  };

  // handle question source
  const handleQuestionSourceChange = (event) => {
    // console.log(event.target.value);
    setQuestionSource(event.target.value);
  };

  // handle question level change
  const handleQuesLevelChange = (event) => {
    // console.log(event.target.value);
    setQuesLevel(event.target.value);
    setDifficultyLevel(event.target.value);
  };

  // to toggle the options if image not contain the options
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
      {/* Label Create question */}

      <Box
        height={"1px"}
        bgcolor={"blue"}
        sx={{
          width: "100%",
          marginBottom: "30px",
          marginTop: "50px",
          position: "relative",
        }}
      >
        <Chip
          color="primary"
          label={"Create Question"}
          size="medium"
          sx={{
            marginTop: "-15px",
            marginLeft: "30px",
            position: "absolute",
            zIndex: 2,
          }}
        />
      </Box>

      {/* Question editor */}
      <Box
        my={2}
        sx={{
          width: "100%",
        }}
      >
        <TextEditor
          placeHolder={"Write your question..."}
          setValue={setQuestion}
        />
      </Box>

      {/* Checkbox to check image contain option or not */}
      <Box
        my={2}
        sx={{
          width: "100%",
        }}
      >
        <FormGroup>
          <FormControlLabel
            sx={{ color: "white" }}
            control={
              <Checkbox
                sx={{ color: "white" }}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            }
            label="Does image value have answer options"
          />
        </FormGroup>
      </Box>
      {/* Options Show */}
      <div style={{ display: isChecked ? "none" : "block" }}>
        {/* Label options */}
        <Box
          height={"1px"}
          bgcolor={"blue"}
          sx={{ marginBottom: "30px", marginTop: "20px", position: "relative" }}
        >
          <Chip
            color="primary"
            label={"Create Options"}
            size="medium"
            sx={{
              marginTop: "-15px",
              marginLeft: "30px",
              position: "absolute",
              zIndex: 2,
            }}
          />
        </Box>

        {/* options */}
        <Grid container columnSpacing={4} rowSpacing={2}>
          <Grid item xs={6}>
            {/* option A */}
            <h4 style={{ color: "white" }}>Option A</h4>
            <Box mb={1}>
              {/* <OptionEditor placeHolder={"Option A is..."} /> */}
              <TextEditor
                placeHolder={"Option A is..."}
                setValue={setOptionA}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            {/* option B */}
            <h4 style={{ color: "white" }}>Option B</h4>
            <Box mb={1}>
              {/* <OptionEditor placeHolder={"Option B is..."} /> */}
              <TextEditor
                placeHolder={"Option B is..."}
                setValue={setOptionB}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            {/* option C */}
            <h4 style={{ color: "white" }}>Option C</h4>
            <Box mb={1}>
              {/* <OptionEditor placeHolder={"Option C is..."} /> */}
              <TextEditor
                placeHolder={"Option C is..."}
                setValue={setOptionC}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            {/* option D */}
            <h4 style={{ color: "white" }}>Option D</h4>
            <Box mb={1}>
              {/* <OptionEditor placeHolder={"Option D is..."} /> */}
              <TextEditor
                placeHolder={"Option D is..."}
                setValue={setOptionD}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Label set Correct Answer */}
        <Box
          height={"1px"}
          bgcolor={"blue"}
          sx={{ marginBottom: "30px", marginTop: "20px", position: "relative" }}
        >
          <Chip
            color="primary"
            label={"Select Correct Answer"}
            size="medium"
            sx={{
              marginTop: "-15px",
              marginLeft: "30px",
              position: "absolute",
              zIndex: 2,
            }}
          />
        </Box>
        {/* corect answer options */}
        <Box paddingY={3}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={answer}
              onChange={handleAnswerChange}
            >
              <Stack
                direction={"row"}
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ color: "white" }}
              >
                <FormControlLabel
                  value="Option A"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Option A"
                />
                <FormControlLabel
                  value="Option B"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Option B"
                />
                <FormControlLabel
                  value="Option C"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Option C"
                />
                <FormControlLabel
                  value="Option D"
                  control={
                    <Radio
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Option D"
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
      </div>

      {/* if options in an Image */}
      <Box
        my={2}
        sx={{
          width: "100%",
          display: isChecked ? "block" : "none",
        }}
      >
        {/* Label set Correct Answer */}
        <Box
          height={"1px"}
          bgcolor={"blue"}
          sx={{
            marginBottom: "30px",
            marginTop: "20px",
            position: "relative",
            width: "100%",
          }}
        >
          <Chip
            color="primary"
            label={"Write Correct Answer"}
            size="medium"
            sx={{
              marginTop: "-15px",
              marginLeft: "30px",
              position: "absolute",
              zIndex: 2,
            }}
          />
        </Box>
        <Box>
          {/* <TextField fullWidth label="Answer" id="fullWidth" onChange={handleAnswerChange}/> */}
          <TextEditor
            placeHolder={"Write answer..."}
            setValue={setCorrectAnswer}
          />
        </Box>
      </Box>

      {/* Label set all question category */}
      <Box
        height={"1px"}
        bgcolor={"blue"}
        sx={{ marginBottom: "30px", marginTop: "20px", position: "relative" }}
      >
        <Chip
          color="primary"
          label={"Set question category"}
          size="medium"
          sx={{
            marginTop: "-15px",
            marginLeft: "30px",
            position: "absolute",
            zIndex: 2,
          }}
        />
      </Box>

      {/* Category */}
      <Box mt={5} sx={{ width: "100%" }}>
        <Grid container justifyContent={"space-between"}>
          {/* Marks */}
          <Grid item>
            <TextField
              id="filled-number"
              label="Question Marks"
              type="number"
              color="primary"
              sx={{ bgcolor: "white" }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleMarkChange}
            />
          </Grid>
          {/* color="primary"
          sx={{bgcolor:"white"}} */}
          {/* Question Type */}
          <Grid item>
            <FormControl
              variant="standard"
              sx={{ minWidth: 150, bgcolor: "white" }}
            >
              <InputLabel id="demo-simple-select-filled-label-questype">
                Question Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label-questype"
                id="demo-simple-select-filled-questype"
                value={quesType}
                onChange={handleQuestionType}
              >
                <MenuItem value={"objective"}>Objective</MenuItem>
                <MenuItem value={"subjective"}>Subjective</MenuItem>
                <MenuItem value={"assertion"}>Assertion </MenuItem>
                <MenuItem value={"reasoning"}>Reasoning </MenuItem>
                <MenuItem value={"paragraph"}>Paragraph </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Difficulty level */}
          <Grid item>
            <FormControl
              variant="standard"
              sx={{ minWidth: 150, bgcolor: "white" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Difficulty Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={quesLevel}
                onChange={handleQuesLevelChange}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Question Source */}
          <Grid item>
            <TextField
              id="filled-number"
              label="Question Source (Previous Year)"
              type="text"
              sx={{ bgcolor: "white" }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleQuestionSourceChange}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
