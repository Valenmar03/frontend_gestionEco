import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardView from "./views/DashboardView";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}