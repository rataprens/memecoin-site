import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useConfig } from "../hooks/useConfig";
import Header from "../components/Header/Header";
import HomeSection from "../components/HomeSection/HomeSection";
import AboutSection from "../components/AboutSection/AboutSection";
import HowToBuySection from "../components/HowToBuySection/HowToBuySection";
import TokenomicsSection from "../components/TokenomicsSection/TokenomicsSection";
import RoadmapSection from "../components/RoadmapSection/RoadmapSection";
import Footer from "../components/Footer/Footer";
import ThemeSelectorFloating from "../components/ThemeSelectorFloating/ThemeSelectorFloating";
import AnimatedBackground from "../components/AnimateBackground/AnimateBackground";
import ShapeSelectorFloating from "../components/ShapeSelectorFloating/ShapeSelectorFloating";

// Definir la interfaz del tema para tener una mejor seguridad de tipos
interface Theme {
  background: string;
  text: string;
}

// Establecer valores predeterminados en caso de que no se pase un tema
const defaultTheme: Theme = {
  background: "#ffffff",  // Fondo blanco como predeterminado
  text: "#000000",        // Texto negro como predeterminado
};

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
`;

const Main = styled.main`
  display: flex;
  padding: 6rem;
  flex-direction: column;
`;

// Definir los posibles "shapes"
type Shape = "circle" | "triangle" | "square";

const IndexPage: React.FC = () => {
  // Usamos useConfig para obtener el tema desde el archivo de configuración
  const config = useConfig();
  const [selectedShape, setSelectedShape] = useState<string>("circle")

  // Verificar que el config tenga la propiedad 'theme' y usarla, si no, usar un valor predeterminado
  const theme = config?.theme || defaultTheme;

  useEffect(() => {
    // Solo carga el valor desde localStorage al montar el componente
    const savedShape = localStorage.getItem("selectedShape") as Shape;
    if (savedShape) {
      setSelectedShape(savedShape); // Establecer el valor de selectedShape si ya existe en localStorage
    }
  }, []);

  const handleShapeChange = (newShape: string) => {
    setSelectedShape(newShape);
  };

  return (
    <>
      <GlobalStyle theme={theme} />
      <AnimatedBackground shape={selectedShape} />
      <Header />
      <Main>
        <HomeSection id="home" />
        <AboutSection id="about" />
        <HowToBuySection id="how-to-buy" />
        <TokenomicsSection id="tokenomics" />
        <RoadmapSection id="roadmap" />
      </Main>
      <Footer />
      <ShapeSelectorFloating onShapeChange={handleShapeChange} />
      <ThemeSelectorFloating></ThemeSelectorFloating> {/* comentar en caso de no utilizarlo en produccion */}
    </>
  );
};

export default IndexPage;
