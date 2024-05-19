import { RouterProvider } from "react-router-dom";
import Navbar from "./components/common/navbar";
import { router } from "./routing/routes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
