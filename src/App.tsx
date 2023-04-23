function App() {
  function visualiseData() {}

  return (
    <div>
      <h1 className="center">Easy Data Visualiser</h1>
      <br />
      <br />
      <textarea className="center" placeholder="Data (JSON)"></textarea>
      <br />
      <br />
      <button className="center" onClick={() => visualiseData()}>
        Visualise Data
      </button>
    </div>
  );
}

export default App;
