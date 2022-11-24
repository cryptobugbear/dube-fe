import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import ListPage from "components/ListPage";
import AddInventory from "components/AddInventory";
import {
  Button,
  DynamicPage,
  DynamicPageTitle,
  Title,
} from "@ui5/webcomponents-react";
import ScanInventory from "components/ScanInventory";

function AppContent() {
  const navigate = useNavigate();

  return (
    <DynamicPage
      showHideHeaderButton={false}
      headerTitle={
        <DynamicPageTitle
          actions={
            <>
              <Button design="Attention" onClick={() => navigate("/scan")}>
                Scan
              </Button>
              <Button design="Emphasized">Login</Button>
            </>
          }
          header={
            <Title>
              <Link to="/">Dube</Link>
            </Title>
          }
        />
      }
    >
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddInventory />} />
        <Route path="/scan" element={<ScanInventory />} />
      </Routes>
    </DynamicPage>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
