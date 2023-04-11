import axios from "axios";
 
 
export type ApiDataType = {
  volume_marginality_relation: any
};

 
export async function getChartDataByAPI() {
  return await axios.get<ApiDataType>(
    `https://iori3.ranepa.ru/science_api/v1/oil_refining/1/`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
}
