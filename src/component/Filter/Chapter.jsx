import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
export default function Chapter({ chapters,setChapter }) {
  console.log(chapters);
  if (!chapters.length) {
    return <Box className="text-center text-white">Subject not Selected</Box>;
  }
  return (
    <Box>
      {chapters.length &&
        chapters.map((item, index) => (
          <Box key={index} marginX={10} marginY={2}>
            <h4
              className="text-2xl font-semibold text-white mb-4 cursor-pointer hover:text-teal-300"
              onClick={() =>
                setChapter({
                  chapterId: item.chapterId,
                  chapterName: item.chapterName,
                })
              }
            >
              {item.chapterName.toUpperCase()}
            </h4>
            <Box className="flex flex-1 gap-3 justify-between">
              <Card
                sx={{
                  minWidth: "20%",
                  maxWidth: "30%",
                  bgcolor: "#D1F4F3",
                }}
              >
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#131842",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Total <br />
                      Question
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 24,
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      {item.questionCount.total_questions}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                sx={{
                  minWidth: "20%",
                  maxWidth: "30%",
                  bgcolor: "#D1F4F3",
                }}
              >
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#131842",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Used <br />
                      Question
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 24,
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      {item.questionCount.used_questions}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                sx={{
                  minWidth: "20%",
                  maxWidth: "30%",
                  bgcolor: "#D1F4F3",
                }}
              >
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: "#131842",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Unused <br />
                      Question
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 24,
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      {item.questionCount.unused_questions}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ))}
    </Box>
  );
}
