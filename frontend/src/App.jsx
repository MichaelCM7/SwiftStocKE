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

  return (
    <Routes>
      {/* General */}
      <Route path="/" element={<Home isAuthorized={isAuthorized} />} />

      {/* Main App Function Pages */}
      <Route path="/Analytics" element={<Analytics isAuthorized={isAuthorized} />} />
      <Route path="/Sales" element={<Sales isAuthorized={isAuthorized} />} />
      <Route path="/History" element={<History isAuthorized={isAuthorized} />} />
      <Route path="/ManageStock" element={<ManageStock isAuthorized={isAuthorized} />} />
      <Route path="/AddNewItem" element={<AddNewItem isAuthorized={isAuthorized} />} />
      <Route path="/EditItem" element={<EditItem isAuthorized={isAuthorized} />} />
      <Route path="/Sales/:saleID" element={<SaleID isAuthorized={isAuthorized} />} />
      <Route path="/RecordNewSale" element={<RecordNewSale isAuthorized={isAuthorized} />} />
      <Route path="/Restock" element={<Restock isAuthorized={isAuthorized} />} />

      {/* Authentication pages */}
      <Route path="/SignIn" element={<SignIn isAuthorized={isAuthorized} />} />
      <Route path="/SignUp" element={<SignUp isAuthorized={isAuthorized} />} />
      <Route path="/ForgotPassword" element={<ForgotPassword isAuthorized={isAuthorized} />} />
      <Route path="/VerifyOTP" element={<VerifyOTP isAuthorized={isAuthorized} />} />
      <Route path="ResetPassword" element={<ResetPassword isAuthorized={isAuthorized} />} />

      {/* Error pages */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App;