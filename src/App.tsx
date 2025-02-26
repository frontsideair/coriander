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
        <footer style={{ fontSize: 10, marginTop: 10 }}>
          Find the code on{" "}
          <a
            href="https://github.com/frontsideair/coriander"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
