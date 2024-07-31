import { I18nProvider } from "react-aria-components";
import "./App.css";
import { Coriander } from "./Coriander";

function App() {
  return (
    <>
      <h1>Coriander</h1>
      <div className="card">
        <I18nProvider locale="en-TR">
          <Coriander />
        </I18nProvider>
        <a
          href="https://www.flaticon.com/free-icons/coriander"
          title="coriander icons"
          style={{ fontSize: 10 }}
        >
          Coriander icons created by Freepik - Flaticon
        </a>
      </div>
    </>
  );
}

export default App;
