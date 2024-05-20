import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./routing/routes";
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </div>
  );
}

export default App;
