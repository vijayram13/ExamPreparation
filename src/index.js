import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



// Import jQuery so we can expose Froala editor to the window.
import $ from 'jquery';

// Expose froala-editor to the window.
window.$ = $;
window.FroalaEditor = require('froala-editor');

// Load wiris mathtype-froala plugin.
require('@wiris/mathtype-froala');

// Load WIRISplugins.js dynamically.
const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
// Load generated scripts.
document.head.appendChild(jsDemoImagesTransform);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

