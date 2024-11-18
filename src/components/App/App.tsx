import styles from "./App.module.scss";
import MainLayer from "../MainLayer/MainLayer";

function App() {
  return (
    <div className={styles.content}>
      <header>
        <h2>Currency Converter</h2>
      </header>
      <MainLayer />
    </div>
  );
}

export default App;
