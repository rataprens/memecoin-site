import React from "react";
import styled, { keyframes } from "styled-components";
import { useConfig } from "../../hooks/useConfig";

// Animación del carrusel continuo
const marqueeAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-33.33%); } /* Mueve solo el 33.33% del ancho total */
`;

const MarqueeContainer = styled.div<{ bgColor: string }>`
  overflow: hidden;
  width: 99.07vw;
  background: ${(props) => props.bgColor};
  padding: 20px 0;
  position: relative;
  display: flex;
  align-items: center;
`;

const MarqueeWrapper = styled.div<{ speed: number }>`
  display: flex;
  width: max-content;
  animation: ${marqueeAnimation} ${({ speed }) => speed}s linear infinite;
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
`;

const MarqueeTextItem = styled.span<{ textColor: string }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.textColor};
  margin-right: 2rem; /* Espaciado entre los textos */
`;

interface MarqueeProps {
  textList: string[];
  speed?: number;
}

const MarqueeText: React.FC<MarqueeProps> = ({ textList, speed = 20 }) => {
  const config = useConfig();
  const theme = config.theme;

  // Triplicamos la lista de textos para asegurar un efecto continuo
  const triplicatedTextList = [...textList, ...textList, ...textList];

  return (
    <MarqueeContainer bgColor={theme.primary}>
      <MarqueeWrapper speed={speed}>
        {triplicatedTextList.map((text, index) => (
          <MarqueeTextItem key={index} textColor={theme.text}>
            {text} •
          </MarqueeTextItem>
        ))}
      </MarqueeWrapper>
    </MarqueeContainer>
  );
};

export default MarqueeText;