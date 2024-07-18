import { Stack, FormControlLabel, Checkbox, Box } from "@mui/material";
export default function QuestionItem(options) {
  const question = <h1>This is Question</h1>;
  return (
    <>
      {/* checkbox and question */}
      <Box>
        <Stack>
          <FormControlLabel
            label=""
            control={
              <Checkbox
                value="Vijay"
                checked={true}
                //   onChange={}
                color="primary"
              />
            }
          />
        </Stack>
      </Box>
    </>
  );
}
