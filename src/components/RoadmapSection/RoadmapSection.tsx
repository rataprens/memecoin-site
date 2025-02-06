import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";

const Section = styled(motion.section)<{ theme: any }>`
  padding: 2rem 2rem;
  background: transparent;
  color: ${(props) => props.theme.text};
  text-align: center;
  border-radius: 20px;
  margin: -2rem auto;
  max-width: 1100px;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
  backdrop-filter: blur(45px);
`;

const Title = styled(motion.h2)<{ theme: any }>`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${(props) => props.theme.primary};
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-left: 30px;

  &::before {
    content: "";
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) => props.theme.primary};
    border-radius: 2px;
  }
`;

const RoadmapItem = styled(motion.div)<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  width: 50%;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-bottom: 1.4rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    background: rgba(255, 255, 255, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    left: -24px;
    top: 50%;
    width: 12px;
    height: 12px;
    background: ${(props) => props.theme.primary};
    border-radius: 50%;
    transform: translateY(-50%);
  }

  strong {
    font-size: 1.4rem;
    color: ${(props) => props.theme.primary};
  }

  span {
    font-size: 1.2rem;
    color: ${(props) => props.theme.textSecondary};
  }
`;

const Description = styled(motion.p)<{ theme: any }>`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 2rem auto 0;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.6;
`;

interface RoadmapSection {
  id: string
}

const RoadmapSection: React.FC<RoadmapSection> = ({id}) => {
  const config = useConfig();
  const theme = config.theme;
  const roadmap = config.siteConfig.roadmap;

  // 🔹 Referencia y detección de visibilidad
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <Section
      id={id}
      theme={theme}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <Title
        theme={theme}
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {roadmap.title}
      </Title>

      <Timeline>
        {roadmap.phases.map((phase, index) => (
          <RoadmapItem
            key={index}
            theme={theme}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
            whileHover={{ scale: 1.05 }}
          >
            <strong>{phase.phase}</strong>: <span>{phase.description}</span>
          </RoadmapItem>
        ))}
      </Timeline>

      <Description
        theme={theme}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        {roadmap.disclaimer}
      </Description>
    </Section>
  );
};

export default RoadmapSection;
