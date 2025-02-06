import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useConfig } from "../../hooks/useConfig"; // Importar el hook

const Section = styled(motion.section)<{ theme: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  background: transparent;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(45px);
  padding: 3rem;
  border-radius: 16px;
  max-width: 900px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled(motion.h2)<{ theme: any }>`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  letter-spacing: 1px;
`;

const Text = styled(motion.p)<{ theme: any }>`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${(props) => props.theme.text};
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

interface AboutSection {
  id: string;  // Añadir id como prop
}

const AboutSection: React.FC<AboutSection> = ({id}) => {
  const config = useConfig();
  const theme = config.theme;
  const coinSymbol = config.siteConfig.coinSymbol;
  const aboutDescription = config.siteConfig.aboutDescription;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <Section
      id={id}
      ref={ref}
      theme={theme}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
    >
      <Card
        theme={theme}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Title
          theme={theme}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          About {coinSymbol}
        </Title>
        <Text theme={theme}>{aboutDescription}
        </Text>
        {/* <Text theme={theme}>{`Launched stealth with no presale, zero taxes, LP burnt and contract renounced.`}
        </Text> */}
      </Card>
    </Section>
  );
};

export default AboutSection;
