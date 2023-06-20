import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { Button } from "./inube/Buttons";

const initialTheme = {
  status: "pending",
  content: {},
};
const mock = {
  color: "red",
};

function Loading() {
  return <h1>Loading</h1>;
}

// Multiclient version
// function App() {
//   const [theme, setTheme] = useState(initialTheme);
//   useEffect(() => {
//     setTimeout(() => setTheme({ status: "resolved", content: mock }), 2000);
//   }, []);

//   if (theme.status === "pending") {
//     return <Loading />;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <div>
//         <h1>Personas</h1>
//         <Button label="login" />
//       </div>
//     </ThemeProvider>
//   );
// }

// Monoclient
function App() {
  console.log(import.meta.env.VITE_CLIENT);

  return (
    <div>
      <h1>Personas</h1>
      <Button label="login" />
    </div>
  );
}

export default App;
