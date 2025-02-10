import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Alert from "../Alert/Alert"; // Importamos el componente de alertas

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 120px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FloatingButton = styled.button<{ isEmpty: boolean }>`
  background-color: ${(props) => (props.isEmpty ? "green" : "red")};
  color: white;
  border: none;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, background-color 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.isEmpty ? "darkgreen" : "darkred")};
    transform: scale(1.1);
  }
`;

const Tooltip = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  bottom: 60px;
  white-space: pre-wrap;
  max-width: 200px;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  ${FloatingButtonContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const ClearStorageButton: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [alert, setAlert] = useState<{ title: string; message: string; type: "success" | "info" } | null>(null);
  const [storageData, setStorageData] = useState<string>("");

  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = () => {
    if (localStorage.length === 0) {
      setIsEmpty(true);
      setStorageData("No hay datos que limpiar.");
    } else {
      setIsEmpty(false);
      const keys = Object.keys(localStorage);
      const data = keys.map((key) => `${key}: ${localStorage.getItem(key)}`).join("\n");
      setStorageData(data);
    }
  };

  const clearLocalStorage = () => {
    if (localStorage.length === 0) {
      setAlert({ title: "No Data", message: "There is no data to clean!", type: "info" });
      return;
    }

    localStorage.clear();
    setIsEmpty(true);
    setStorageData("No hay datos que limpiar.");
    setAlert({ title: "Storage Cleared", message: "LocalStorage has been cleaned successfully!", type: "success" });

    setTimeout(() => {
      setAlert(null);
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      {alert && <Alert title={alert.title} message={alert.message} type={alert.type} />}
      <FloatingButtonContainer>
        <Tooltip>{storageData}</Tooltip>
        <FloatingButton isEmpty={isEmpty} onClick={clearLocalStorage}>
          🗑️
        </FloatingButton>
      </FloatingButtonContainer>
    </>
  );
};

export default ClearStorageButton;
