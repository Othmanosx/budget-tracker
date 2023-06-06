import React from "react";
import { Pie } from "@ant-design/plots";

interface Props {
  data: {
    cost: string;
    name: string;
  }[];
}

const Chart = ({ data }: Props) => {
  const elements = data.map((item) => ({ ...item, cost: Number(item.cost) }));
  const config = {
    appendPadding: 10,
    data: elements,
    angleField: "cost",
    colorField: "name",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
export default Chart;
