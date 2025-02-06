import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaWallet, FaEthereum, FaExchangeAlt, FaCheckCircle } from "react-icons/fa";
import { useConfig } from "../../hooks/useConfig";

const Section = styled.section<{ theme: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 2rem;
  background: transparent;
  transition: background 0.3s ease;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(45px);
  padding: 3rem;
  border-radius: 16px;
  max-width: 750px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.h2<{ theme: any }>`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  letter-spacing: 1px;
`;

const List = styled.ol`
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 2rem;
`;

const ListItem = styled.li<{ theme: any }>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${(props) => props.theme.text};
  margin-bottom: 1.5rem;

  svg {
    margin-right: 12px;
    color: ${(props) => props.theme.primary};
    font-size: 1.8rem;
  }
`;

type Blockchain = "ethereum" | "solana";

interface HowToBuySection {
  id:string;
}

const HowToBuySection: React.FC<HowToBuySection> = ({id}) => {
  const config = useConfig();
  const theme = config.theme;
  const selectedBlockchain = config.siteConfig.selectedBlockchain as Blockchain; // Leemos la red seleccionada
  const blockchainInstructions = config.siteConfig.blockchainInstructions[selectedBlockchain]; // Leemos las instrucciones de la blockchain seleccionada

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Renderiza las instrucciones basadas en los datos del siteConfig
  const renderInstructions = () => {
    return blockchainInstructions.steps.map((step:any, index: number) => {
      const Icon = step.icon === "FaWallet" ? FaWallet : step.icon === "FaEthereum" ? FaEthereum : step.icon === "FaExchangeAlt" ? FaExchangeAlt : FaCheckCircle;
      return (
        <ListItem theme={theme} key={index}>
          <Icon />
          <strong>{step.title}:</strong> {step.description}
        </ListItem>
      );
    });
  };

  return (
    <Section id={id} theme={theme}>
      <Card
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1 }}
      >
        <Title theme={theme}>How to Buy</Title>
        <List>
          {renderInstructions()} {/* Mostrar las instrucciones dinámicas */}
        </List>
      </Card>
    </Section>
  );
};

export default HowToBuySection;
