import React, { useState } from "react";
import Papa from "papaparse";
import saveCsvToDB from "../data/uploadCsvData";
import { Container, Box } from "@mui/material";
const CsvUpload = () => {
  const [csvData, setCsvData] = useState([]);

  const handleLocalCsv = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
        console.log(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
      },
    });
  };

  const handleCsvUpload = () => {
    saveCsvToDB(csvData);
  };

  return (
    <Container maxWidth={"xl"}>
      <Box className=" p-4 justify-center ">
        <div className="px-4">
          <h1 className="font-mono font-bold text-2xl text-white ">
            Upload CSV File
          </h1>
          <div style={{ margin: "20px 0 20px 0" }}></div>
          <input
            type="file"
            accept=".csv"
            onChange={handleLocalCsv}
            className="text-white"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                display: csvData.length ? "block" : "none",
              }}
              className="font-mono font-bold text-xl text-white pt-4"
            >
              CSV Data
            </h2>
            <button
              style={{
                display: csvData.length ? "block" : "none",

                backgroundColor: "darkolivegreen",
                padding: "0px 20px 0px 20px",
              }}
              onClick={handleCsvUpload}
            >
              Upload
            </button>
          </div>
          {csvData.length > 0 && (
            <div>
              <hr style={{ margin: "20px 0 20px 0", width: "100%" }} />
              <table>
                <thead>
                  <tr>
                    {Object.keys(csvData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default CsvUpload;
