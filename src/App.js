import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import AuthProvider from "./components/Context/AuthContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AddTour from "./pages/Dashboard/AddTour";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageBooking from "./pages/Dashboard/ManageBooking";
import MyBooking from "./pages/Dashboard/MyBooking";
import Professionals from "./pages/Dashboard/Professionals";
import Finance from "./pages/Dashboard/Finance";
import Forms from "./pages/Dashboard/Forms";
import Reports from "./pages/Dashboard/Reports";
import Configuracion from "./pages/Dashboard/Configuracion";
import Participantes from "./pages/Dashboard/Participantes";
import TourList from "./pages/Dashboard/TourList";
import UpdateTour from "./pages/Dashboard/UpdateTour";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Programs from "./pages/Programs/Programs";
import Register from "./pages/Register/Register";
import SingleTour from "./pages/SingleTour/SingleTour";

// Component to conditionally render header and footer
const AppContent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/participantes') ||
                          location.pathname.startsWith('/add-tour') ||
                          location.pathname.startsWith('/tour-list') ||
                          location.pathname.startsWith('/my-booking') ||
                          location.pathname.startsWith('/booking-list') ||
                          location.pathname.startsWith('/update-tour') ||
                          location.pathname.startsWith('/profesionales') ||
                          location.pathname.startsWith('/financiero') ||
                          location.pathname.startsWith('/formularios') ||
                          location.pathname.startsWith('/reportes') ||
                          location.pathname.startsWith('/configuracion');

  return (
    <>
      {!isDashboardRoute && <Header />}
      <div className={!isDashboardRoute ? "pt-20" : ""}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/programs">
            <Programs />
          </Route>
          <PrivateRoute path="/tour-details/:id">
            <SingleTour />
          </PrivateRoute>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/participantes">
            <Participantes />
          </PrivateRoute>
          <PrivateRoute path="/add-tour">
            <AddTour />
          </PrivateRoute>
          <PrivateRoute path="/tour-list">
            <TourList />
          </PrivateRoute>
          <PrivateRoute path="/my-booking/:id">
            <MyBooking />
          </PrivateRoute>
          <PrivateRoute path="/booking-list">
            <ManageBooking />
          </PrivateRoute>
          <PrivateRoute path="/update-tour/:id">
            <UpdateTour />
          </PrivateRoute>
          <PrivateRoute path="/profesionales">
            <Professionals />
          </PrivateRoute>
          <PrivateRoute path="/financiero">
            <Finance />
          </PrivateRoute>
          <PrivateRoute path="/formularios">
            <Forms />
          </PrivateRoute>
          <PrivateRoute path="/reportes">
            <Reports />
          </PrivateRoute>
          <PrivateRoute path="/configuracion">
            <Configuracion />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      {!isDashboardRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <div className="font-Poppins">
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
