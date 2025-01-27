import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Pencil, Eye, Trash } from "react-bootstrap-icons";
import { useAuth } from "../AuthContext";
import { AppDispatch } from "../redux/strore";
import { useDispatch } from "react-redux";
import { updateMetrics } from "../redux/apiSlice"; // Assuming updateMetrics exists in your slice
import EditModal from "./AppModal";

interface TableProps {
  data: {
    name: string;
    category: string;
    price: string;
    quantity: number;
    value: string;
  }[];
}

const AppTable: React.FC<TableProps> = ({ data }) => {
  const { isAdmin } = useAuth(); // Access context values
  const [disabledRows, setDisabledRows] = useState<Set<string>>(new Set());
  const [inventroyData, setInventoryData] = useState(data); // Maintain table data in state
  const [modalData, setModalData] = useState<{
    name: string;
    category: string;
    price: string;
    quantity: number;
    value: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  // Function to handle the eye button click

  // Function to handle the eye button click
  const handleEyeClick = (name: string) => {
    setDisabledRows((prev) => {
      const updatedRows = new Set(prev);
      if (updatedRows.has(name)) {
        updatedRows.delete(name);
      } else {
        updatedRows.add(name);
      }
      // Compute updated metrics using the updated rows
      const visibleData = data.filter((item) => !updatedRows.has(item.name));
      const totalProducts = visibleData.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const storeValue = visibleData.reduce(
        (sum, item) => sum + parseFloat(item.value.replace("$", "")),
        0
      );
      const outOfStocks = visibleData.filter(
        (item) => item.quantity === 0
      ).length;
      const noOfCategories = new Set(visibleData.map((item) => item.category))
        .size;

      // Dispatch the updated metrics to the Redux store
      dispatch(
        updateMetrics({
          totalProducts,
          storeValue,
          outOfStocks,
          noOfCategories,
        })
      );

      return updatedRows;
    });
  };

  const handleEditClick = (item: (typeof data)[0]) => {
    setModalData({ ...item });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalData) {
      // Update the inventory data
      const updatedData = inventroyData.map((item) =>
        item.name === modalData.name ? modalData : item
      );
      setInventoryData(updatedData);

      // Recompute metrics
      const totalProducts = updatedData.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const storeValue = updatedData.reduce(
        (sum, item) => sum + parseFloat(item.value.replace("$", "")),
        0
      );
      const outOfStocks = updatedData.filter(
        (item) => item.quantity === 0
      ).length;
      const noOfCategories = new Set(updatedData.map((item) => item.category))
        .size;

      dispatch(
        updateMetrics({
          totalProducts,
          storeValue,
          outOfStocks,
          noOfCategories,
        })
      );

      // Close the modal
      setShowModal(false);
    }
  };

  const handleDeleteClick = (name: string) => {
    setInventoryData((prevData) => {
      const updatedData = prevData.filter((item) => item.name !== name);

      // Recompute metrics after deletion
      const totalProducts = updatedData.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const storeValue = updatedData.reduce(
        (sum, item) => sum + parseFloat(item.value.replace("$", "")),
        0
      );
      const outOfStocks = updatedData.filter(
        (item) => item.quantity === 0
      ).length;
      const noOfCategories = new Set(updatedData.map((item) => item.category))
        .size;

      dispatch(
        updateMetrics({
          totalProducts,
          storeValue,
          outOfStocks,
          noOfCategories,
        })
      );

      return updatedData; // Update state with the new data
    });
  };

  return (
    <div className="mt-4">
      {inventroyData.length > 0 ? (
        <>
          <Table
            striped
            hover
            responsive
            className="custom-table" // Add a custom class for styling
          >
            <thead>
              <tr className="border">
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventroyData?.map((item) => (
                <tr
                  key={item.name}
                  style={{
                    backgroundColor: disabledRows.has(item.name)
                      ? "#f8f9fa"
                      : "white", // Optionally change the background color for disabled rows
                    opacity: disabledRows.has(item.name) ? 0.6 : 1, // Reduce opacity for disabled rows
                  }}
                  className="border"
                >
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.value}</td>
                  <td>
                    <button
                      disabled={!isAdmin}
                      className="btn btn-link"
                      onClick={() => handleEditClick(item)}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="btn btn-link"
                      disabled={!isAdmin}
                      onClick={() => handleEyeClick(item.name)} // Disable the row when the eye icon is clicked
                    >
                      <Eye /> {/* Eye Icon */}
                    </button>
                    <button
                      className="btn btn-link"
                      disabled={!isAdmin}
                      onClick={() => handleDeleteClick(item.name)}
                    >
                      <Trash /> {/* Delete Icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <EditModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            modalData={modalData}
            setModalData={setModalData}
          />
        </>
      ) : (
        <div className="text-center"> No Inventory Data Available</div>
      )}
    </div>
  );
};

export default AppTable;
