import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Estilos dinámicos según el tipo de alerta
const alertColors = {
  success: { bg: "#4CAF50", text: "#fff", border: "#388E3C" },
  error: { bg: "#F44336", text: "#fff", border: "#D32F2F" },
  warning: { bg: "#FF9800", text: "#fff", border: "#F57C00" },
  info: { bg: "#2196F3", text: "#fff", border: "#1976D2" },
};

// Contenedor principal de la alerta
const AlertContainer = styled(motion.div)<{ type: keyof typeof alertColors }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${(props) => alertColors[props.type].bg};
  color: ${(props) => alertColors[props.type].text};
  border-left: 5px solid ${(props) => alertColors[props.type].border};
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 250px;
  max-width: 400px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

// Iconos para los tipos de alerta
const AlertIcon = ({ type }: { type: keyof typeof alertColors }) => {
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };
  return <span>{icons[type]}</span>;
};

// Componente de Alerta Reutilizable
const Alert: React.FC<{ title: string; message: string; type: keyof typeof alertColors }> = ({
  title,
  message,
  type,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AlertContainer
      type={type}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <AlertIcon type={type} />
      <div>
        <strong>{title}</strong>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>{message}</p>
      </div>
      <CloseButton onClick={() => setVisible(false)}>✖️</CloseButton>
    </AlertContainer>
  );
};

export default Alert;
