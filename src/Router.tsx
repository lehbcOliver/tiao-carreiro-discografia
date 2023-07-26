import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Album } from "./components/Album";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album" element={<Album />} />
    </Routes>
  );
}