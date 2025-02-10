import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useConfig } from "../../hooks/useConfig"; // Importar el hook

import homeImage from "../../images/replace-home-image.png"

const Section = styled(motion.section)<{ theme: any }>`
  padding: 5rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: -10rem;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.theme.background}, ${props.theme.primary})`};
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin: 90px;
  color: ${(props) => props.theme.text};
  flex-wrap: wrap;
`;

const TextContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
  padding: 1rem;
  margin-left: 10rem;
  text-align: left;
`;

const Title = styled(motion.h2)<{ theme: any }>`
  font-size: 3rem;
  font-weight: 800;
  color: ${(props) => props.theme.buttonBackground}; 
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Description = styled(motion.p)`
  color: #ddd;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0;
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  min-width: 300px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeImage = styled.img`
  max-width: 60%;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

interface SectionProps {
  id: string;  // Añadir id como prop
}

const HomeSection: React.FC<SectionProps> = ({ id }) => {
  const config = useConfig();
  const theme = config.theme;
  const coinName = config.siteConfig.coinName;
  const homeDescription = config.siteConfig.homeDescription;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <Section
      id={id}
      ref={ref}
      theme={theme}
      initial={{ opacity: 0, y: -50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      <TextContainer
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Title
          theme={theme}
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : { scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {coinName}
        </Title>
        <Description
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {homeDescription}
        </Description>
      </TextContainer>
      <ImageContainer
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <HomeImage src={homeImage} alt={coinName} />
      </ImageContainer>
    </Section>
  );
};

export default HomeSection;
