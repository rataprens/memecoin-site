import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";
import headerLogo from "../../images/replace-logo-image.png"

// Componente para el logo
const Logo = styled.img`
  width: 50px;        /* Ajusta el tamaño según sea necesario */
  height: auto;
  margin-right: 1rem; /* Espacio entre el logo y el título */
`;

// Componente Nav estilizado con styled-components y Framer Motion
const Nav = styled(motion.nav)<{ theme: any }>`
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 1600px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);  /* Sombra más elegante */
  border-radius: 20px;  /* Bordes redondeados para un look moderno */
  border: 0.1px solid ${(props) => props.theme.primary};  /* Borde sutil y elegante */
  padding: 1.5rem 3rem;
  transition: background 0.3s ease, transform 0.3s ease;  /* Transición para mayor suavidad */
  backdrop-filter: blur(10px);
  z-index: 1000;
`;



const NavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TitleContainer = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  align-items: center;
`;

const NavItemsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li<{ theme: any }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, color 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: scale(1.1);
    color: ${(props) => props.theme.primary};
  }
`;

const BuyButtonNav = styled.button<{ theme: any }>`
  background: none;
  width: 60%;
  border: 2px solid ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonBackground};
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;  /* Centra verticalmente */
  justify-content: center;  /* Centra horizontalmente */
  text-align: center;  /* Asegura que el texto se centre correctamente */

  &:hover {
    background-color: ${(props) => props.theme.buttonBackground};
    color: #fff;
  }
`;


const BuyButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;  /* Hace que el contenedor ocupe el máximo espacio disponible */
`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const config = useConfig();
  const theme = config.theme;
  const siteTitle = config.siteConfig.siteTitle

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    // Función para hacer scroll hacia las secciones
    const handleNavItemClick = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 180,  // Ajusta el valor de "100" según tu necesidad (esto es el offset desde la parte superior)
          behavior: "smooth",
        });
      }
    };

  return (
    <Nav
      theme={theme} // Pasamos el tema al componente Nav
      initial={{ width: "90vw", padding: "1.5rem 3rem" }}
      animate={{
        width: isScrolled ? "calc(100% - 40px)" : "90vw",
        padding: isScrolled ? "1rem 2rem" : "1.5rem 3rem",
      }}
      transition={{ duration: 0.3 }}
    >
      <NavContainer>
        <TitleContainer>
          {/* Agrega aquí la ruta a tu logo */}
          <Logo src={headerLogo} alt="Logo" />
          <motion.h1
            initial={{ scale: 1 }}
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {siteTitle}
          </motion.h1>
        </TitleContainer>
        <NavItemsContainer>
          <NavLinks>
            <NavItem onClick={() => handleNavItemClick("home")}>HOME</NavItem>
            <NavItem onClick={() => handleNavItemClick("about")}>ABOUT</NavItem>
            <NavItem onClick={() => handleNavItemClick("how-to-buy")}>HOW TO BUY</NavItem>
            <NavItem onClick={() => handleNavItemClick("tokenomics")}>TOKENOMICS</NavItem>
            <NavItem onClick={() => handleNavItemClick("roadmap")}>ROADMAP</NavItem>
          </NavLinks>
          <BuyButtonContainer>
            <BuyButtonNav theme={theme}>Buy Now</BuyButtonNav>
          </BuyButtonContainer>
        </NavItemsContainer>
      </NavContainer>
    </Nav>
  );
};

export default Header;
