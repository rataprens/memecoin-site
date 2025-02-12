import { useEffect, useState } from "react";
import siteConfigJson from "../config/siteConfig.json";
import themeConfigJson from "../config/themeConfig.json";
import siteHeaderConfigJson from "../config/siteHeaderConfig.json";
import { ThemeName } from "../types/themeTypes";
import { Shape } from "../types/shapeTypes";
import ISiteConfig from "../interfaces/ISiteConfig";
import ITheme from "../interfaces/ITheme";

// Obtener los temas de siteConfig con validación de tipo
const themes: Record<ThemeName, ITheme> = themeConfigJson.themes;

// Verificar que el tema seleccionado sea válido, si no, usar un tema por defecto
const getValidTheme = (themeName: string): ITheme => {
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
    "pentagon",
  ];

  return validShapes.includes(shape as Shape) ? (shape as Shape) : "circle"; // Default a "circle" si es inválido
};

// Obtener los tipos de encabezado desde el JSON
const headerTypes = siteHeaderConfigJson.headerTypes.map((header) => header.name);

// Verificar que el tipo de encabezado seleccionado sea válido
const getValidHeaderType = (headerType: string): string => {
  return headerTypes.includes(headerType) ? headerType : "default"; // Default a "default" si es inválido
};

export const useConfig = () => {
  // Estado para determinar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);

  // Obtener la configuración desde JSON
  const siteConfig: ISiteConfig = siteConfigJson;
  const siteHeaderConfig = siteHeaderConfigJson;

  // Cargar valores guardados o usar los valores predeterminados solo en el cliente
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [theme, setTheme] = useState<ITheme>(themes.dark);
  const [selectedShape, setSelectedShape] = useState<Shape>("circle");
  const [selectedHeaderType, setSelectedHeaderType] = useState<string>("default");

  // Función para actualizar el tema
  const updateTheme = (themeName: ThemeName) => {
    setSelectedTheme(themeName);
    const newTheme = getValidTheme(themeName);
    setTheme(newTheme);
    if (isClient) {
      localStorage.setItem("selectedTheme", themeName);
      window.location.reload();
    }
  };

  // Función para actualizar la forma
  const updateShape = (shape: Shape) => {
    setSelectedShape(shape);
    if (isClient) {
      localStorage.setItem("selectedShape", shape);
    }
  };

  // Función para actualizar el tipo de encabezado
  const updateHeaderType = (headerType: string) => {
    const validHeader = getValidHeaderType(headerType);
    setSelectedHeaderType(validHeader);
    if (isClient) {
      localStorage.setItem("selectedHeaderType", validHeader);
    }
  };

  useEffect(() => {
    // Asegurarse de que solo se ejecute en el cliente
    setIsClient(true);

    if (isClient) {
      const storedTheme = localStorage.getItem("selectedTheme");
      if (storedTheme) {
        setSelectedTheme(storedTheme);
        setTheme(getValidTheme(storedTheme));
      }

      const storedShape = localStorage.getItem("selectedShape");
      if (storedShape) {
        setSelectedShape(getValidShape(storedShape));
      }

      const storedHeaderType = localStorage.getItem("selectedHeaderType");
      if (storedHeaderType) {
        setSelectedHeaderType(getValidHeaderType(storedHeaderType));
      }
    }
  }, [isClient]);

  return {
    siteConfig,
    siteHeaderConfig,
    theme,
    themes,
    selectedTheme,
    selectedShape,
    selectedHeaderType,
    headerTypes,
    updateTheme,
    updateShape,
    updateHeaderType,
  };
};
