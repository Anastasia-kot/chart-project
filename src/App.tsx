import { useEffect, useState } from "react";
import "./App.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./shared/store/redux-store";
import { getChartData } from "./shared/store/app-reducer";
import { CoordinatesAPIType, CoordinatesType, YearSetType } from "./shared/types";

const App = () => {
  const chartData = useSelector((state: RootState) => state.appPage.dataset);
  const [chartData1, setChartData1] = useState<CoordinatesType[]>([]);
  const [chartData2, setChartData2] = useState<CoordinatesType[]>([]);
  
  const mapDataset = (dataset: CoordinatesAPIType[]): CoordinatesType[] => {
    return dataset.map(({ x, y }) => {
      return [x, y];
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(getChartData());
  }, []);

  //инициализационное значение для графика
  useEffect(() => {
    if (chartData){
      const initialYear = Object.keys(chartData)[0] as unknown as number;
       let newChartData1 = mapDataset(chartData[initialYear].vds_sub); 

       let newChartData2 = mapDataset(chartData[initialYear].vds_wsub); 

      setChartData1(newChartData1);
      setChartData2(newChartData2);

      
    }

     }, [chartData]);

  

 const onClick = (year:  number ) => {
    if(chartData && chartData[year]) {
       let newChartData1 = mapDataset(chartData[year].vds_sub) 
      setChartData1(newChartData1);

       let newChartData2 = mapDataset(chartData[year].vds_wsub) 
      setChartData2(newChartData2);

     }
  };

  const options: Highcharts.Options = {
    title: {
      text: "График со сложным датасетом",
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        align: "left",
        x: -10,
        y: 10,
        format: "{value:.,0f}",
      },
      showFirstLabel: false,
    },

    xAxis: {
      accessibility: {
        rangeDescription: "данные шкалы X",
      },
      tickInterval: 50, // one week
      tickWidth: 0,
      gridLineWidth: 1,
    },

    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
    },

    series: [
      { name: "Датасет 1", type: "line", data: chartData1 },
      { name: "Датасет 2", type: "line", data: chartData2 },
    ],
  };

  return (
    <div className="App">
      <div className="buttons"  >
        {chartData &&
          Object.keys(chartData).map((k, index) => (
            <button key={index} onClick={() => onClick(+k)}>
              {k}
            </button>
          ))}
      </div>

      {chartData && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default App;
