import dm from "@rexysaur/datamocker";
import {} from "chart.js";
import { ChangeEvent, useEffect, useState } from "react";
import { BarChart } from "./components/BarChart";
import FileUploader from "./components/FileUploader";
import { PieChart } from "./components/PieChart";

function App() {
  const [chartData, setChartData] = useState([] as {}[]);

  const [writtenChartData, setWrittenChartData] = useState([]);
  const [selector, setSelector] = useState("favouriteColour");
  const [valueSelector, setValueSelector] = useState("weight");

  const [selectedChart, setSelectedChart] = useState("Bar Chart");

  useEffect(() => {
    (async () => {
      const users = await dm.generate<{
        height: number;
        weight: number;
        favouriteColour: string;
      }>({
        count: 100,
        template: {
          height: () => dm.util.getRandomInt(140, 190),
          weight: () => dm.util.getRandomInt(45, 90),
          favouriteColour: () =>
            dm.util.pickRandom(["red", "green", "blue", "yellow"]),
        },
      });

      console.log(users);

      setChartData(users);
    })();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedChart(event.target.value);
  };

  function visualiseData() {
    setChartData(writtenChartData);
  }

  return (
    <div>
      <div className="background-colour" />
      <br />
      <br />
      <h1 className="center">Easy Data Visualiser</h1>
      <br />
      <br />
      <FileUploader onFileUpload={(file) => console.log(file)} />
      <br />
      <br />
      <textarea
        className="center"
        style={{ textAlign: "left" }}
        placeholder="Data (JSON)"
        id="chartData"
        onChange={(e) => setWrittenChartData(eval(e.target.value))}
        autoCapitalize="false"
        autoComplete="false"
      ></textarea>
      <br />
      <br />
      <input
        className="center"
        placeholder="data key selector"
        onChange={(e) => {
          setSelector(e.target.value);
        }}
        autoCapitalize="false"
        autoComplete="false"
      />
      <br />
      <input
        className="center"
        placeholder="data value selector"
        onChange={(e) => {
          setValueSelector(e.target.value);
        }}
        autoCapitalize="false"
        autoComplete="false"
      />
      <br />
      <br />
      <div className="chart-selector center">
        <label className="radio-label">
          <input
            type="radio"
            name="chartType"
            value="Bar Chart"
            checked={selectedChart === "Bar Chart"}
            onChange={handleChange}
          />
          Bar Chart
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="chartType"
            value="Pie Chart"
            checked={selectedChart === "Pie Chart"}
            onChange={handleChange}
          />
          Pie Chart
        </label>
      </div>
      <br />
      <br />
      <button className="center" onClick={() => visualiseData()}>
        Visualise Data
      </button>
      <br />
      <br />
      {selectedChart == "Bar Chart" ? (
        <BarChart
          chartData={chartData}
          selector={selector}
          valueSelector={valueSelector}
        />
      ) : (
        <PieChart
          chartData={chartData}
          selector={selector}
          valueSelector={valueSelector}
        />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
