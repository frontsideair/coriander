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
      </div>
    </>
  );
}

export default App;
