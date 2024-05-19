import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./screens/LandingPage";
import SignUp from "./screens/SignUp";
import AdminSignIn from "./screens/AdminSignIn";
import ClientSignIn from "./screens/ClientSignIn";
import ScrollToTop from "./utility/ScrollToTop";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientDashBoard from "./screens/ClientDashBoard";
import AdminDashBoard from "./screens/AdminDashBoard";
import MarketPlace from "./screens/MarketPlace";
import Cart from "./screens/Cart";
import ClientChatBox from "./screens/ClientChatBox";
import ContactUs from "./screens/ContactUs";
import ClientOrderHistory from "./screens/ClientOrderHistory";
import ClientOrders from "./screens/ClientOrders";
import ClientNotifications from "./screens/ClientNotifications";
import Settings from "./screens/Settings";
import ViewGame from "./screens/ViewGame";
import ViewConsole from "./screens/ViewConsole";
import ViewSubscription from "./screens/ViewSubscription";
import ViewAccessory from "./screens/ViewAccessory";
import ViewOrderDetails from "./screens/ViewOrderDetails";
import AdminOrderHistory from "./screens/AdminOrderHistory";
import AdminFeedbackView from "./screens/AdminFeedbackView";
import AdminOrders from "./screens/AdminOrders";
import AdminOrderDetails from "./screens/AdminOrderDetials";
import AdminNotifications from "./screens/AdminNotifications";
import AdminAllProducts from "./screens/AdminAllProducts";
import AdminGames from "./screens/AdminGames";
import AdminConsoles from "./screens/AdminConsoles";
import AdminAccessories from "./screens/AdminAccessories";
import AdminSubscriptions from "./screens/AdminSubscriptions";
import PreInbox from "./screens/PreInbox";
import AdminInbox from "./screens/AdminInbox";
import CreateProduct from "./screens/CreateProduct";
import CreateConsole from "./screens/CreateConsole";
import CreateGame from "./screens/CreateGame";
import CreateAccessory from "./screens/CreateAccessory";
import CreateSubscription from "./screens/CreateSubscription";
import EditSubscription from "./screens/EditSubscription";
import EditAccessory from "./screens/EditAccessory";
import EditGame from "./screens/EditGame";
import EditConsole from "./screens/EditConsole";
import AdminViewOrderHistory from "./screens/AdminViewOrderHistory";

import ClientLibrary from "./screens/ClientLibrary";
import AIchatBot from "./screens/AIchatBot";
import Analytics from "./screens/Analytics";

function App() {
  return (
    <Router>
      <ScrollToTop></ScrollToTop>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/clientsignin" element={<ClientSignIn />} />
          <Route path="/adminsignin" element={<AdminSignIn />} />
          <Route path="/clientdashboard" element={<ClientDashBoard />} />
          <Route path="/admindashboard" element={<AdminDashBoard />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/clientinbox" element={<ClientChatBox />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/clientorderhistory" element={<ClientOrderHistory />} />
          <Route path="/clientorders" element={<ClientOrders />} />
          <Route
            path="/clientnotifications"
            element={<ClientNotifications />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/viewgame/:gameId" element={<ViewGame />} />
          <Route path="/viewconsole/:consoleId" element={<ViewConsole />} />
          <Route
            path="/viewsubscription/:subscriptionId"
            element={<ViewSubscription />}
          />
          <Route
            path="/viewaccessory/:accessoryId"
            element={<ViewAccessory />}
          />
          <Route
            path="/vieworderdetails/:orderId"
            element={<ViewOrderDetails />}
          />

          <Route path="/adminorderhistory" element={<AdminOrderHistory />} />
          <Route path="/adminfeedbackview" element={<AdminFeedbackView />} />
          <Route path="/adminorders" element={<AdminOrders />} />
          <Route
            path="/adminorderdetails/:orderId"
            element={<AdminOrderDetails />}
          />
          <Route path="/adminnotifications" element={<AdminNotifications />} />
          <Route path="/adminallproducts" element={<AdminAllProducts />} />
          <Route path="/admingames/:productId" element={<AdminGames />} />
          <Route path="/adminconsoles/:productId" element={<AdminConsoles />} />
          <Route
            path="/adminaccessories/:productId"
            element={<AdminAccessories />}
          />
          <Route
            path="/adminsubscription/:productId"
            element={<AdminSubscriptions />}
          />
          <Route
            path="/editsubscriptions/:productId"
            element={<EditSubscription />}
          />
          <Route path="/editconsoles/:productId" element={<EditConsole />} />
          <Route path="/editgames/:productId" element={<EditGame />} />
          <Route
            path="/editaccessories/:productId"
            element={<EditAccessory />}
          />
          <Route
            path="/editsubscription/:productId"
            element={<EditSubscription />}
          />
          <Route path="/preinbox" element={<PreInbox />} />
          <Route path="/admininbox/:userId" element={<AdminInbox />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/createconsole" element={<CreateConsole />} />
          <Route path="/creategame" element={<CreateGame />} />
          <Route path="/createaccessory" element={<CreateAccessory />} />
          <Route path="/createsubscription" element={<CreateSubscription />} />
          <Route
            path="/adminvieworderhistory/:orderId"
            element={<AdminViewOrderHistory />}
          />
          <Route
            path="/libarary"
            element={<ClientLibrary></ClientLibrary>}
          ></Route>
          <Route path="/aichatbot" element={<AIchatBot></AIchatBot>}></Route>
          <Route path="/analytics" element={<Analytics></Analytics>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
