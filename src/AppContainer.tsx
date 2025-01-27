import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponse, fetchData } from "./redux/apiSlice";
import { AppDispatch } from "./redux/strore";
import AppTable from "./components/AppTable";
import AppNavbar from "./components/AppNavbar";
import AppCard from "./components/AppCard";

// Define the type for the state from Redux store
interface RootState {
  api: {
    data: ApiResponse[];
    loading: boolean;
    error: string | null;
  };
}

const AppContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get state from the Redux store

  const { data, loading, error } = useSelector((state: RootState) => state.api);

  // Dispatch the action to fetch data on component mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render data if fetched successfully
  return (
    <div>
      <AppNavbar />
      <div className="px-4 py-4 backgrnd h-100">
        <AppCard />
        <AppTable data={data} />
      </div>
    </div>
  );
};

export default AppContainer;
