import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";

// Definir la interfaz del tema para tener una mejor seguridad de tipos
interface Theme {
    background: string;
    text: string;
  }
  

// Contenedor general del dropdown, manteniéndolo flotante en la esquina inferior derecha.
const DropdownContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 200px;
  z-index: 1000;
`;

// Botón que muestra la opción seleccionada y actúa como disparador.
const DropdownButton = styled.div<{ theme: Theme }>`
  padding: 10px 16px;
  background-color: ${(props) => props.theme.buttonBackground || "#ffffff"};
  color: ${(props) => props.theme.buttonText || "#333"};
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

// Contenedor de opciones, se despliega hacia arriba y se limita la altura.
const OptionsContainer = styled(motion.ul)<{ theme: Theme }>`
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  width: 100%;
  max-height: 200px; /* Límite de altura */
  overflow-y: auto;  /* Habilita el scroll vertical */
  background-color: ${(props) => props.theme.buttonBackground || "#ffffff"};
  border-radius: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  /* Ocultar la barra de desplazamiento */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// Cada opción individual del dropdown.
const OptionItem = styled.li<{ theme: Theme }>`
  padding: 10px 16px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.theme.buttonText || "#333"};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground || "#f1f1f1"};
  }
`;

// Ícono de flecha (se rota al abrir/cerrar).
const ArrowIcon = styled.span<{ theme: Theme }>`
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s ease;
  color: ${(props) => props.theme.buttonText || "#333"};
`;

const CustomDropdown: React.FC = () => {
  const { updateTheme, themes, theme, selectedTheme } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Alterna la apertura del dropdown.
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Maneja la selección de una opción.
  const handleOptionClick = (themeKey: string) => {
    updateTheme(themeKey as "dark" | "light" | "blue");
    setIsOpen(false);
  };

  // Cierra el dropdown si se hace clic fuera del componente.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Etiqueta de la opción actualmente seleccionada.
  const selectedLabel = selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown} theme={theme}>
        {selectedLabel}
        <ArrowIcon theme={theme} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </ArrowIcon>
      </DropdownButton>
      <AnimatePresence>
        {isOpen && (
          <OptionsContainer
            theme={theme}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {Object.keys(themes).map((themeKey) => (
              <OptionItem theme={theme} key={themeKey} onClick={() => handleOptionClick(themeKey)}>
                {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
              </OptionItem>
            ))}
          </OptionsContainer>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
};

export default CustomDropdown;
