import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardView from "./views/DashboardView";
import ProductsView from "./views/ProductsView";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/control-stock" element={<DashboardView/>} index />
                    <Route path="/ventas" element={<DashboardView/>} index />
                    <Route path="/facturas" element={<DashboardView/>} index />
                    <Route path="/products" element={<ProductsView/>} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}