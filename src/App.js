import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import CardProfile from "./components/CardProfile/CardProfile";
import ProfilePage from "./pages/ProfilePage";
import SigninPage from "./pages/SigninPage";
import SignupComp from "./components/SignupComs/SignupComp";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import FavoritePage from "./pages/FavoritePage";
import AddRecipePage from "./pages/AddRecipePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<SigninPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/addRecipe" element={<AddRecipePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignupComp />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
