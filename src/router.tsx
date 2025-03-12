import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardView from "./views/products/DashboardView";
import ProductsView from "./views/products/ProductsView";
import StockManagmentView from "./views/products/StockManagmentView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/control-stock" element={<StockManagmentView/>}  />
                    <Route path="/ventas" element={<DashboardView/>}  />
                    <Route path="/facturas" element={<DashboardView/>}  />
                    <Route path="/products" element={<ProductsView/>}  />
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}