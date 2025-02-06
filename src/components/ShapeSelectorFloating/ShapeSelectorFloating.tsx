import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";

// Definir los posibles "shapes"
type Shape =
  | "circle"
  | "triangle"
  | "square"
  | "hexagon"
  | "diamond"
  | "star"
  | "pentagon"


// Definir la interfaz del tema para tener una mejor seguridad de tipos
interface Theme {
  background: string;
  text: string;
  buttonBackground: string;
  buttonText: string;
  hoverBackground: string;
}

// Estilos para el contenedor del selector
const ShapeSelectorContainer = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 200px;
  z-index: 1000;
`;

// Botón que muestra la opción seleccionada y actúa como disparador
const ShapeSelectorButton = styled.div<{ theme: Theme }>`
  padding: 10px 16px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.text};
  }
`;

// Contenedor de opciones, se despliega hacia arriba y se limita la altura
const OptionsContainer = styled(motion.ul)<{ theme: Theme }>`
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.buttonBackground};
  border-radius: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// Cada opción individual del dropdown
const OptionItem = styled.li<{ theme: Theme }>`
  padding: 10px 16px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.theme.buttonText};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground || "#f1f1f1"};
  }
`;

// Ícono de flecha (se rota al abrir/cerrar)
const ArrowIcon = styled.span<{ theme: Theme }>`
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s ease;
  color: ${(props) => props.theme.buttonText};
`;

interface ShapeSelectorProps {
  onShapeChange: (shape: Shape) => void; // Cambié aquí para que reciba un Shape
}

const ShapeSelectorFloating: React.FC<ShapeSelectorProps> = ({ onShapeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateShape } = useConfig();
  const [selectedShape, setSelectedShape] = useState<Shape>("circle"); // Aquí también se usa "Shape"
  const config = useConfig();
  const theme = config.theme;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Alterna la apertura del dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Maneja la selección de una opción
  const handleOptionClick = (shape: Shape) => { // Aquí se espera un tipo "Shape"
    updateShape(shape);
    setSelectedShape(shape);
    onShapeChange(shape);  // Emitir el valor de la forma seleccionada
    setIsOpen(false);
  };

  useEffect(() => {
    // Solo carga el valor desde localStorage al montar el componente
    const savedShape = localStorage.getItem("selectedShape") as Shape;
    if (savedShape) {
      setSelectedShape(savedShape); // Establecer el valor de selectedShape si ya existe en localStorage
    }
  }, []);

  // Cierra el dropdown si se hace clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ShapeSelectorContainer ref={dropdownRef}>
      <ShapeSelectorButton theme={theme} onClick={toggleDropdown}>
        {selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1)}
        <ArrowIcon theme={theme} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </ArrowIcon>
      </ShapeSelectorButton>

      <AnimatePresence>
        {isOpen && (
          <OptionsContainer
            theme={theme}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {[
              "circle",
              "triangle",
              "square",
              "hexagon",
              "diamond",
              "star",
              "pentagon",
            ].map((shape) => (
              <OptionItem theme={theme} key={shape} onClick={() => handleOptionClick(shape as Shape)}>
                {shape.charAt(0).toUpperCase() + shape.slice(1)}
              </OptionItem>
            ))}
          </OptionsContainer>
        )}
      </AnimatePresence>
    </ShapeSelectorContainer>
  );
};

export default ShapeSelectorFloating;
