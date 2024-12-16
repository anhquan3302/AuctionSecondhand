import { StrictMode } from "react";
//import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import './css/style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/configureStoreRedux.js";
import { MaterialTailwindControllerProvider } from "./context/index.jsx";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(<App />);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <MaterialTailwindControllerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
      </MaterialTailwindControllerProvider>
    </Provider>
  </StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "@material-tailwind/react";
// import { Provider } from "react-redux";
// import { MaterialTailwindControllerProvider } from "./context/index.jsx";
// import "../public/css/tailwind.css";
// import "./styles/tailwind.css";
// import "./styles/index.css";
// import "./styles/font.css";
// import './css/style.css';


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider>
//         <MaterialTailwindControllerProvider>
//             <App />
//         </MaterialTailwindControllerProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// );
