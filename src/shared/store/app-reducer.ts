import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiDataType, getChartDataByAPI } from "../api";
import { CoordinatesAPIType, DatasetType } from "../types";
 
 

export const getChartData = createAsyncThunk(
  "app/getChartData",
  //@ts-ignore
  async (thunkAPI): ResponseDataType => {
    try {
      const {data} = await getChartDataByAPI();
      return data;
    } catch (err) {
      //@ts-ignore
      return thunkAPI.rejectWithValue("Error");
    }
  }
);

 
 
export interface initialStateType {
  isFetching: boolean;
  dataset: DatasetType | null;
}

let initialState: initialStateType = {
  isFetching: false, 
  dataset: null
  
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChartData.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        getChartData.fulfilled,
        (state, action: PayloadAction<ApiDataType>) => {
         

          state.dataset = action.payload.volume_marginality_relation
   
          state.isFetching = false;
        }
      )
      .addCase(getChartData.rejected, (state) => {
        state.dataset = null;
        state.isFetching = false;
       })

    
  },
});

 export default AppSlice.reducer;
