import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_base } from "../constants";

// Define the type for the data you expect to receive from the API
export interface ApiResponse {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
}

// Define the state shape
interface ApiState {
  data: ApiResponse[];
  loading: boolean;
  totalProducts: number; // Add totalProducts to the state
  storeValue: number;
  outOfStocks: number;
  noOfCategories: number;
  error: string | null;
}

// Initial state
const initialState: ApiState = {
  data: [],
  loading: false,
  error: null,
  outOfStocks: 0,
  noOfCategories: 0,
  totalProducts: 0, // Add totalProducts to the state
  storeValue: 0,
};

// Async thunk to fetch data
export const fetchData = createAsyncThunk<ApiResponse[]>(
  "api/fetchData",
  async () => {
    const response = await axios.get(api_base); // Replace with your API endpoint
    return response.data;
  }
);

// Create slice
const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    // Single action to update all metrics
    updateMetrics: (state, action) => {
      state.totalProducts = action.payload.totalProducts;
      state.storeValue = action.payload.storeValue;
      state.outOfStocks = action.payload.outOfStocks;
      state.noOfCategories = action.payload.noOfCategories;
    },
    // Individual actions for specific metrics (if needed)
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    setStoreValue: (state, action) => {
      state.storeValue = action.payload;
    },
    setOutOfStocks: (state, action) => {
      state.outOfStocks = action.payload;
    },
    setNoOfCategories: (state, action) => {
      state.noOfCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.totalProducts = action.payload.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.storeValue = action.payload.reduce(
          (sum, item) => sum + parseFloat(item.value.replace("$", "")),
          0
        );
        state.outOfStocks = action.payload.filter(
          (item) => item.quantity === 0
        ).length;
        state.noOfCategories = new Set(
          action.payload.map((item) => item.category)
        ).size;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Export actions and reducer
export const {
  updateMetrics,
  setTotalProducts,
  setStoreValue,
  setOutOfStocks,
  setNoOfCategories,
} = apiSlice.actions;

export default apiSlice.reducer;
