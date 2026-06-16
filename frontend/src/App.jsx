import { Routes, Route } from 'react-router';
import { useState } from 'react';
import './App.css';
// General
import { Home } from "./pages/Home/Home"
// Main App Function Pages
import { Analytics } from "./pages/Analytics/Analytics"
import { Sales } from "./pages/Sales/Sales"
import { History } from "./pages/History/History"
import { ManageStock } from "./pages/ManageStock/ManageStock"
import { AddNewItem } from "./pages/ManageStock/AddNewItem/AddNewItem"
import { EditItem } from "./pages/ManageStock/EditItem/EditItem"
import { SaleID } from "./pages/Sales/SaleID/SaleID"
import { RecordNewSale } from "./pages/Sales/RecordNewSale/RecordNewSale"
import { Restock } from "./pages/ManageStock/Restock/Restock"
// Authentication pages
import { SignIn } from "./pages/Authentication/SignIn/SignIn"
import { SignUp } from "./pages/Authentication/SignUp/SignUp"
import { ForgotPassword } from "./pages/Authentication/ForgotPassword/ForgotPassword"
import { VerifyOTP } from "./pages/Authentication/VerifyOTP/VerifyOTP"
import { ResetPassword } from "./pages/Authentication/ResetPassword/ResetPassword"
// Error pages
import { PageNotFound } from "./pages/Error/PageNotFound"

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [purpose, setPurpose] = useState(null);

  return (
    <Routes>
      {/* General */}
      <Route path="/" element={<Home isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />

      {/* Main App Function Pages */}
      <Route path="/Analytics" element={<Analytics isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/Sales" element={<Sales isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/History" element={<History isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/ManageStock" element={<ManageStock isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/AddNewItem" element={<AddNewItem isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/EditItem/:id" element={<EditItem isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/Sales/:saleID" element={<SaleID isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/RecordNewSale" element={<RecordNewSale isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/Restock" element={<Restock isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />

      {/* Authentication pages */}
      <Route path="/SignIn" element={<SignIn isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />
      <Route path="/SignUp" element={<SignUp isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />} />
      <Route path="/ForgotPassword" element={<ForgotPassword isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />} />
      <Route path="/VerifyOTP" element={<VerifyOTP isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} purpose={purpose} />} />
      <Route path="ResetPassword" element={<ResetPassword isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />} />

      {/* Error pages */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App;