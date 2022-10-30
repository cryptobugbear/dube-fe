import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "components/ListPage";
import AddInventory from "components/AddInventory";
import {
  Button,
  DynamicPage,
  DynamicPageTitle,
  Title,
} from "@ui5/webcomponents-react";

function App() {
  return (
    <Router>
      <DynamicPage
        showHideHeaderButton={false}
        headerTitle={
          <DynamicPageTitle
            actions={
              <>
                <Button design="Attention">Scan</Button>
                <Button design="Emphasized">Login</Button>
              </>
            }
            header={<Title>Dube</Title>}
          />
        }
      >
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddInventory />} />
        </Routes>
      </DynamicPage>
    </Router>
  );
}

export default App;
