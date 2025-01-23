"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ({ value, label }) {
  const color = value > 80 ? "#F37B24" : "#008771";
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#2C3950"],
        borderWidth: 0,
        borderRadius: 10,
        circumference: 290,
        rotation: 215,
      },
    ],
  };

  const options = {
    cutout: "92%",
    plugins: {
      tooltip: { enabled: false },
    },
    hover: {
      mode: null,
    },
  };

  const doughnutLabel = {
    id: "doughnut",
    beforeDatasetsDraw: (chart) => {
      const { ctx } = chart;

      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = "16px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${value}%`, xCoor, yCoor);
    },
  };

  return (
    <div className="m-8 flex w-[150px] flex-col items-center justify-center">
      <Doughnut data={data} options={options} plugins={[doughnutLabel]} />
      <p className="mt-2 text-nowrap text-xs">{label}</p>
    </div>
  );
}
