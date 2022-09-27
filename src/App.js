import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./components/about/About";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import FlashCards from "./components/card/FlashCards";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="flashCards/:id" element={<FlashCards />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
