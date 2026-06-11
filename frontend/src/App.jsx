import { Routes, Route } from 'react-router';
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
// Authentication pages
import { SignIn } from "./pages/Authentication/SignIn/SignIn"
import { SignUp } from "./pages/Authentication/SignUp/SignUp"
import { ForgotPassword } from "./pages/Authentication/ForgotPassword/ForgotPassword"
import { VerifyOTP } from "./pages/Authentication/VerifyOTP/VerifyOTP"
import { ResetPassword } from "./pages/Authentication/ResetPassword/ResetPassword"
// Error pages
import { PageNotFound } from "./pages/Error/PageNotFound"

function App() {
  return (
    <Routes>
      {/* General */}
      <Route path="/" element={<Home />} />

      {/* Main App Function Pages */}
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/Sales" element={<Sales />} />
      <Route path="/History" element={<History />} />
      <Route path="/ManageStock" element={<ManageStock />} />
      <Route path="/AddNewItem" element={<AddNewItem />} />
      <Route path="/EditItem" element={<EditItem />} />
      <Route path="/Sales/:saleID" element={<SaleID />} />
      <Route path="/RecordNewSale" element={<RecordNewSale />} />

      {/* Authentication pages */}
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/VerifyOTP" element={<VerifyOTP />} />
      <Route path="ResetPassword" element={<ResetPassword />} />

      {/* Error pages */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App;