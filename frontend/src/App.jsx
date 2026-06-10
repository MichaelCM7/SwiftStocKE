import { Routes, Route } from 'react-router';
import './App.css';
// PAGES
import Home from "./pages/Home/Home"
import Analytics from "./pages/Analytics/Analytics"
import Sales from "./pages/Sales/Sales"
import History from "./pages/History/History"
import ManageStock from "./pages/ManageStock/ManageStock"
import AddNewItem from "./pages/ManageStock/AddNewItem/AddNewItem"
import EditItem from "./pages/ManageStock/EditItem/EditItem"
import SaleID from "./pages/Sales/SaleID/SaleID"
import RecordNewSale from "./pages/Sales/RecordNewSale/RecordNewSale"
import SignIn from "./pages/Authentication/SignIn/SignIn"
import SignUp from "./pages/Authentication/SignUp/SignUp"
import ForgotPassword from "./pages/Authentication/ForgotPassword/ForgotPassword"
import VerifyOTP from "./pages/Authentication/VerifyOTP/VerifyOTP"
import PageNotFound from "./pages/Error/PageNotFound"

function App() {

  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/Sales" element={<Sales />} />
      <Route path="/History" element={<History />} />
      <Route path="/ManageStock" element={<ManageStock />} />
      <Route path="/AddNewItem" element={<AddNewItem />} />
      <Route path="/EditItem" element={<EditItem />} />
      <Route path="/SaleID" element={<SaleID />} />
      <Route path="/RecordNewSale" element={<RecordNewSale />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/VerifyOTP" element={<VerifyOTP />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App;
