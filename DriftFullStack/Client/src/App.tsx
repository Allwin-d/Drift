import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Entries from "./pages/Entries/Entries";
import NewEntry from "./pages/NewEntry/NewEntry";
import EntryDetail from "./pages/EntryDetail/EntryDetail";
import Map from "./pages/Map/Map";
import MainLayout from "./layouts/MainLayout";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/entries" element={<Entries />}></Route>
            <Route path="/entryDetail/:id" element={<EntryDetail />}></Route>
            <Route path="/entries/new" element={<NewEntry />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/map" element={<Map />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
