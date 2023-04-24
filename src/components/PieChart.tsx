import { PropsWithChildren } from "react";
import { Pie } from "react-chartjs-2";

export function PieChart(
  props: PropsWithChildren & {
    chartData: any[];
    selector: string;
    valueSelector: string;
  }
) {
  return (
    <div
      className="chart-container center"
      style={{ height: "500px", width: "800px" }}
    >
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={{
          labels: Array.from(
            new Set(
              props.chartData.map(
                (data: {}) => data[props.selector as keyof {}]
              )
            ).values()
          ),
          datasets: [
            {
              label: "Data",
              data: (() => {
                let data: {}[] = [];

                Array.from(
                  new Set(
                    props.chartData.map(
                      (data: {}) => data[props.selector as keyof {}]
                    )
                  ).keys()
                ).forEach((key) => {
                  const values = props.chartData
                    .filter((x) => x[props.selector] == key)
                    .map((x) => x[props.valueSelector]);

                  const sum = values.reduce((a, b) => a + b, 0);

                  data.push(Math.floor(sum / values.length));
                });

                return data;
              })(),
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Data Visualised",
            },
            legend: {
              display: false,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
