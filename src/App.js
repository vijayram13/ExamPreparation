import React from 'react'
import HeaderComponent from './component/HeaderComponent'
import HomeComponent from './component/HomeComponent'
import Upload from './component/Upload'
import Download from './component/Download'
import CsvUpload from './component/CSVUpload'


import DownloadNew from'./component/newComponent/DownoadNew';
import FinalDownload from'./component/newComponent/FinalDownload';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HeaderComponent />,
      children: [
        { index: true, element: <HomeComponent /> },
        { path: "/upload", element: <Upload /> },
        {
          path: "/download",
          // element: <Download />
          // element: <DownloadNew />
          element: <FinalDownload />
        },
        {
          path: "/csvupload",
          element: <CsvUpload />

        }
      ],

    }
     
  ]);
  return (

    <RouterProvider router={router} />



  )
}

export default App




