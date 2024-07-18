import * as React from "react";

import { Box, Stack, Chip, Container } from "@mui/material";
import { Link } from "react-router-dom";
// react-router-dom
import { Outlet } from "react-router-dom";

const pages = ["Home", "Upload", "CSV Upload", "Download"];

export default function HeaderComponent(params) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Container maxWidth={"xl"}>
        <Box className="rounded-full  m-4 p-2 bg-[#00366C]">
          <Stack direction={"row"} justifyContent={"center"} p={0.7}>
            <Link to={"/"}>
              <h1 className="text-[#ffffff] ps-4 font-semibold text-lg lg:text-2xl ">
                Exam Preparation
              </h1>
            </Link>

            <Box sx={{ marginLeft: "auto", justifyContent: "center" }}>
              {pages.map((item, index) => (
                <Link
                  key={item}
                  to={
                    index === 0
                      ? "/"
                      : index === 1
                      ? "/upload"
                      : index === 2
                      ? "/csvupload"
                      : "/download"
                  }
                >
                  <Chip
                    key={index}
                    label={item}
                    clickable
                    sx={{
                      fontSize: "1rem",
                      bgcolor: "transparent",
                      color: "white",
                      marginX: "10px",
                      ":hover": { bgcolor: "#28CC9E" },
                    }}
                  ></Chip>
                </Link>
              ))}
            </Box>
          </Stack>
        </Box>
      </Container>

      {/* Outlet */}
      <Outlet />
    </>
  );
}
