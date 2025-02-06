import { useEffect, useState } from "react";
import siteConfigJson from "../config/siteConfig.json";
import themeConfigJson from "../config/themeConfig.json"

// Definir los nombres de temas válidos
type ThemeName = "dark" | "light" | "blue";

// Interfaz para los valores de los temas
interface Theme {
  background: string;
  primary: string;
  text: string;
  buttonBackground: string;
  buttonText: string;
}

// Definir los posibles "shapes"
type Shape =
  | "circle"
  | "triangle"
  | "square"
  | "hexagon"
  | "diamond"
  | "star"
  | "heart"
  | "pentagon"
  | "ellipse"
  | "wave";

// Definir la estructura completa de siteConfig
interface SiteConfig {
  siteName: string;
  coinName: string;
  coinSymbol: string;
  contractAddress: string;
  siteTitle: string;
  selectedTheme: string;
  selectedBlockchain: string; 
  blockchainInstructions: Record<string, any>;
  tokenSupply: string;
  taxes: string;
  burntLP: string;
  homeDescription: string;
  aboutDescription: string;
  roadmap: {
    title: string;
    phases: Array<{
      phase: string;
      description: string;
    }>;
    disclaimer: string;
  };
  footerDescription: string;
  backgroundShape:string;
}

// Obtener los temas de siteConfig con validación de tipo
const themes: Record<ThemeName, Theme> = themeConfigJson.themes;

// Verificar que el tema seleccionado sea válido, si no, usar un tema por defecto
const getValidTheme = (themeName: string): Theme => {
  return themes[themeName as ThemeName] || themes.dark; // Default a "dark" si es inválido
};

// Verificar que la forma seleccionada sea válida
const getValidShape = (shape: string): Shape => {
  const validShapes: Shape[] = [
    "circle",
    "triangle",
    "square",
    "hexagon",
    "diamond",
    "star",
    "pentagon"
  ];

  return validShapes.includes(shape as Shape) ? (shape as Shape) : "circle"; // Default a "circle" si es inválido
};


export const useConfig = () => {
  // Obtener el tema guardado en localStorage o usar el del JSON
  const siteConfig: SiteConfig = siteConfigJson; 
  const savedTheme = localStorage.getItem("selectedTheme") || siteConfigJson.selectedTheme;
  const savedShape = localStorage.getItem("selectedShape") || siteConfigJson.backgroundShape;

  // Guardamos el tema y la forma seleccionados en estado separado
  const [selectedTheme, setSelectedTheme] = useState<string>(savedTheme);
  const [theme, setTheme] = useState<Theme>(getValidTheme(savedTheme));
  const [selectedShape, setSelectedShape] = useState<Shape>(getValidShape(savedShape));

  // Función para actualizar el tema
  const updateTheme = (themeName: ThemeName) => {
    setSelectedTheme(themeName);
    const newTheme = getValidTheme(themeName);
    setTheme(newTheme);
    localStorage.setItem("selectedTheme", themeName);
    window.location.reload();
  };

  // Función para actualizar la forma
  const updateShape = (shape: Shape) => {
    setSelectedShape(shape);
    localStorage.setItem("selectedShape", shape);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      setSelectedTheme(storedTheme);
      setTheme(getValidTheme(storedTheme));
    }
  }, []);

  return {
    siteConfig,
    theme,
    updateTheme, // Función para actualizar el tema
    themes,      // Los temas definidos en siteConfig.json
    selectedTheme, // El tema actualmente seleccionado (guardado en localStorage)
    selectedShape, // La forma actualmente seleccionada
    updateShape,   // Función para actualizar la forma
  };
};
