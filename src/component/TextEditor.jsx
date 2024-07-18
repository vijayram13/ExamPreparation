// Import necessary styles and scripts for Froala Editor.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";

import { useState } from "react";



export default function TextEditor({placeHolder,setValue}) {
  // Define the toolbar and configuration options for the Froala editor.
  const toolbar = [
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "subscript",
    "superscript",
    "insertImage",
    "wirisEditor",
    "wirisChemistry",
  ];

  const froalaConfig = {
    toolbarButtons: toolbar,
    placeholderText: placeHolder,
    imageUpload: true,
    imageUploadURL: 'http://localhost:8000/upload_image',
    imageCORSProxy:"",
    imageManagerDeleteURL:"",
    imageEditButtons: [
      "wirisEditor",
      "wirisChemistry",
      "imageDisplay",
      "imageAlign",
      "imageInfo",
      "imageRemove",
    ],
    htmlAllowedTags: [".*"],
    htmlAllowedAttrs: [".*"],
    htmlAllowedEmptyTags: ["mprescripts", "none"],
    pluginsEnabled: ["wiris", "image", "imageManager"],
    attribution: false,
    events: {
      'image.replaced': function ($img, response) {
          // Image was replaced in the editor.
      alert('Image has been replaced successfully.');
      },
      'image.error': function (error, response) {
          // Image was uploaded to the server.
      alert('Image uploading failed.');
              },
       //delete image from the server
      'image.beforeRemove': function ($img) {
      //Send Http request to delete the image
      },
      'imageManager.imageDeleted': function (data) {
      // Do something here.
      // this is the editor instance.
      console.log(this);
      }
           }
          
  };
  const [content, setContent] = useState();

  // Function to strip HTML tags
const stripHtmlTags = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

  const handleModelChange = (newContent) => {
    console.log(newContent);
    setContent(newContent);
    setValue(newContent)
    // setValue(stripHtmlTags(newContent))

    
  };

  return (
    <>
      <FroalaEditorComponent
        tag="textarea"
        config={froalaConfig}
        model={content}
        onModelChange={handleModelChange}
      />
      {/* Preview section */}
      {/* <div>
                <h3>Preview:</h3>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div> */}
    </>
  );
}
