import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardView from "./views/DashboardView";
import ProductsView from "./views/ProductsView";
import StockManagmentView from "./views/StockManagmentView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import SalesView from "./views/SalesView";
import BillsViews from "./views/BillsViews";
import ClientsView from "./views/ClientsView";
import SalesForm from "./components/Sales/SalesForm";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/stock-management" element={<StockManagmentView/>}  />
                    <Route path="/sales" element={<SalesView/>} >
                        <Route path="/sales/add-sale" element={<SalesForm/>}/>
                    </Route>
                    <Route path="/bills" element={<BillsViews/>}  />
                    <Route path="/products" element={<ProductsView/>}  />
                    <Route path="/clients" element={<ClientsView/>}  />
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}