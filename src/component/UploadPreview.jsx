import { Box, Container, Grid } from "@mui/material";
export default function UploadPreview({ questionData }) {
  console.log("Preview:", questionData);
  const data = questionData[0];
  console.log(data);
  return (
    <>
  
    <Container>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
            height: "10vh",
          }}
        >
          <span
            style={{ paddingRight: "10px", fontWeight: "bold", color: "blue" }}
          >
            Q
          </span>
          <span
            style={{ color: "blue" }}
            dangerouslySetInnerHTML={{ __html: data.question }}
          ></span>

          <div
            style={{ marginLeft: "auto", marginRight: "5px" }}
            dangerouslySetInnerHTML={{ __html: data.marks }}
          ></div>
          <span>Marks</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <span
              style={{ color: "red", fontWeight: "bold", marginRight: "5px" }}
            >
              A.
            </span>
            <span dangerouslySetInnerHTML={{ __html: data.optionA }}></span>
          </div>

          <div style={{ display: "flex" }}>
            <span
              style={{ color: "red", fontWeight: "bold", marginRight: "5px" }}
            >
              B.
            </span>
            <span dangerouslySetInnerHTML={{ __html: data.optionB }}></span>
          </div>

          <div style={{ display: "flex" }}>
            <span
              style={{ color: "red", fontWeight: "bold", marginRight: "5px" }}
            >
              C.
            </span>
            <span dangerouslySetInnerHTML={{ __html: data.optionC }}></span>
          </div>

          <div style={{ display: "flex" }}>
            <span
              style={{ color: "red", fontWeight: "bold", marginRight: "5px" }}
            >
              D.
            </span>
            <span dangerouslySetInnerHTML={{ __html: data.optionD }}></span>
          </div>
        </Box>
        <Box>
          <Box mt={2}>
            <span style={{ fontWeight: "bold", color: "blue" }}>
              Correct Answer:{" "}
            </span>{" "}
            {data.correctAnswer}
          </Box>
          <Grid container justifyContent={"space-between"} mt={2}>
            <Grid item>
              <span style={{ fontWeight: "bold", color: "blue" }}>Type: </span>{" "}
              {data.questionType}
            </Grid>
            <Grid item>
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Difficulty Level:{" "}
              </span>{" "}
              {data.difficultyLevel}
            </Grid>
            <Grid item>
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Source:{" "}
              </span>
              {data.source}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
