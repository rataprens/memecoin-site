import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView, useAnimation } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";

const Section = styled.section`
  padding: 4rem 2rem;
  background: transparent;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  transition: background 0.3s ease;
  margin-bottom: 3rem;
`;

const Card = styled(motion.div)<{ theme: any }>`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(45px);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  width: 320px;
  text-align: center;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.primary};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px ${(props) => props.theme.buttonBackground};
  }

  h3 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.primary};
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

interface TokenomicsSection {
  id: string;
}

const TokenomicsSection: React.FC<TokenomicsSection> = ({id}) => {
  const config = useConfig();
  const theme = config.theme;
  const tokenSupply:string = config.siteConfig.tokenSupply;
  const taxes:string = config.siteConfig.taxes;
  const burntLp:string = config.siteConfig.burntLP

  // Animaciones controladas manualmente
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  // Referencias para detectar visibilidad
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  // Detectar si las tarjetas están en vista
  const isInView1 = useInView(ref1, { margin: "-50px" });
  const isInView2 = useInView(ref2, { margin: "-50px" });
  const isInView3 = useInView(ref3, { margin: "-50px" });

  // Efecto para animar al entrar en vista
  React.useEffect(() => {
    if (isInView1) controls1.start({ opacity: 1, y: 0 });
    else controls1.start({ opacity: 0, y: 50 });

    if (isInView2) controls2.start({ opacity: 1, y: 0 });
    else controls2.start({ opacity: 0, y: 50 });

    if (isInView3) controls3.start({ opacity: 1, y: 0 });
    else controls3.start({ opacity: 0, y: 50 });
  }, [isInView1, isInView2, isInView3, controls1, controls2, controls3]);

  return (
    <Section id={id}>
      <Card ref={ref1} theme={theme} initial={{ opacity: 0, y: 50 }} animate={controls1} transition={{ duration: 0.5 }}>
        <h3>Token Supply</h3>
        <p>{tokenSupply}</p>
      </Card>

      <Card ref={ref2} theme={theme} initial={{ opacity: 0, y: 50 }} animate={controls2} transition={{ duration: 0.6 }}>
        <h3>No Taxes</h3>
        <p>{taxes}</p>
      </Card>

      <Card ref={ref3} theme={theme} initial={{ opacity: 0, y: 50 }} animate={controls3} transition={{ duration: 0.7 }}>
        <h3>Burnt LP</h3>
        <p>{burntLp}</p>
      </Card>
    </Section>
  );
};

export default TokenomicsSection;
