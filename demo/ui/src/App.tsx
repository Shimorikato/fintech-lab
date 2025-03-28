import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import CustomerDetailScreen from "./pages/CustomerDetailScreen";
import CustomerNameScreen from "./pages/CustomerNameScreen";
import CustomerProofOfIdentity from "./pages/CustomerProofOfIdentity";
import CustomerContactDetails from "./pages/CustomerContactDetails";
import CustomerAddress from "./pages/CustomerAddress";
import CustomerList from "./pages/CustomerList";
import CustomerViewScreen from "./pages/CustomerViewScreen";
import { ThemeProvider } from "./components/ThemeContext";
import { CustomerProvider } from "./context/CustomerContext";

function App() {
  return (
    <ThemeProvider>
      <CustomerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/customer-details"
              element={<CustomerDetailScreen />}
            />
            <Route path="/customer-list" element={<CustomerList />} />
            <Route
              path="/customer-details/:id"
              element={<CustomerDetailScreen />}
            />
            <Route path="/customer-view/:id" element={<CustomerViewScreen />} />
            <Route path="/customer-name" element={<CustomerNameScreen />} />
            <Route
              path="/customer-proof-of-identity"
              element={<CustomerProofOfIdentity />}
            />
            <Route
              path="/customer-contact-details"
              element={<CustomerContactDetails />}
            />
            <Route path="/customer-address" element={<CustomerAddress />} />
          </Routes>
        </Router>
      </CustomerProvider>
    </ThemeProvider>
  );
}

export default App;
