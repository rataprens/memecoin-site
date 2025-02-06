import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";

// Animación de movimiento para los elementos flotantes
const floatAnimation = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-20px) }
  100% { transform: translateY(0px) }
`;

// Contenedor principal del fondo
const BackgroundContainer = styled.div<{ theme: any }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  background: ${(props) => props.theme.background};
  overflow: hidden;
`;

// Estilo para las burbujas animadas
const Bubble = styled(motion.div)<{ theme: any; size: number; x: string; y: string; shape: string }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${(props) => props.theme.primary};
  opacity: 0.1;
  top: ${(props) => props.y};
  left: ${(props) => props.x};
  animation: ${floatAnimation} 6s ease-in-out infinite;
  filter: blur(5px);

  /* Condicional para el tipo de forma */
  border-radius: ${(props) => (props.shape === "circle" ? "50%" : "0")};
  clip-path: ${(props) =>
    props.shape === "triangle"
      ? "polygon(50% 0%, 0% 100%, 100% 100%)"
      : props.shape === "square"
      ? "none"
      : props.shape === "hexagon"
      ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
      : props.shape === "diamond"
      ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
      : props.shape === "star"
      ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" 
      : props.shape === "pentagon"
      ? "polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%)"
      : "none"};
`;


interface AnimatedBackgroundProps {
  shape: string;  // Prop para definir la forma
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ shape }) => {
  const { theme } = useConfig(); // Obtener tema dinámico

  return (
    <BackgroundContainer theme={theme}>
      {/* Burbujas animadas con posiciones y tamaños variados */}
      {[...Array(6)].map((_, i) => (
        <Bubble
          key={i}
          theme={theme}
          size={Math.random() * 120 + 60} // Tamaño entre 60px y 180px
          x={`${Math.random() * 100}vw`}
          y={`${Math.random() * 100}vh`}
          shape={shape} // Pasa la forma seleccionada
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
            y: ["0%", "-10%", "0%"],
          }}
          transition={{
            duration: Math.random() * 6 + 4, // Duración aleatoria entre 4s y 10s
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;
