import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";  // Usamos el mismo hook
import { Facebook, Twitter, Instagram, Github, Linkedin } from "lucide-react";

// Estilos modernos con bordes redondeados y sombra suave
const FooterContainer = styled.footer<{ theme: any }>`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 1rem 3rem;
  text-align: center;
  font-size: 1rem;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra global */
  border-radius: 16px;
  transition: all 0.3s ease;
  
  /* Sombra suave en la parte superior */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${(props) => props.theme.primary}; /* El color puede ser el tema primario */
    border-radius: 16px 16px 0 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil en la parte superior */
  }
`;


const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

// Contenedor de los íconos alineados horizontalmente
const IconList = styled.div`
  display: flex;
  gap: 1.5rem;
`;

// Estilos para los íconos
const IconWrapper = styled.a<{ theme: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: ${(props) => props.theme.primary};
  }
`;

const Footer: React.FC = () => {
  const config = useConfig();  // Usamos el hook useConfig
  const theme = config.theme;
  const footerDescription = config.siteConfig.footerDescription;
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para mostrar el footer solo cuando el usuario esté al final de la página
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsVisible(true);  // Se muestra al llegar al final
      } else {
        setIsVisible(false);  // Se oculta cuando no se llega al final
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}  // Desplazamiento hacia abajo al principio
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}  // Animación de desvanecimiento y deslizamiento
      transition={{ duration: 0.6, ease: "easeOut" }}  // Transición suave
    >
      <FooterContainer theme={theme}>
        <FooterContent>
          <p>{footerDescription}</p>
          <IconList>
            <IconWrapper href="https://twitter.com" theme={theme} target="_blank">
              <Twitter size={24} />
            </IconWrapper>
            <IconWrapper href="https://facebook.com" theme={theme} target="_blank">
              <Facebook size={24} />
            </IconWrapper>
            <IconWrapper href="https://instagram.com" theme={theme} target="_blank">
              <Instagram size={24} />
            </IconWrapper>
            <IconWrapper href="https://linkedin.com" theme={theme} target="_blank">
              <Linkedin size={24} />
            </IconWrapper>
          </IconList>
        </FooterContent>
      </FooterContainer>
    </motion.div>
  );
};

export default Footer;
