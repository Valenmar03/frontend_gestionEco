import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardView from "./views/DashboardView";
import ProductsView from "./views/ProductsView";
import StockManagmentView from "./views/StockManagmentView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import SalesView from "./views/SalesView";
import BillsViews from "./views/BillsViews";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/control-stock" element={<StockManagmentView/>}  />
                    <Route path="/ventas" element={<SalesView/>}  />
                    <Route path="/facturas" element={<BillsViews/>}  />
                    <Route path="/products" element={<ProductsView/>}  />
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}