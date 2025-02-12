import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useConfig } from "../../hooks/useConfig";
import headerLogo from "../../images/replace-logo-image.png";
import siteHeaderConfigJson from "../../config/siteHeaderConfig.json";
import IHeaderStyle from "../../interfaces/IHeaderStyle"
import IHeaderType from "../../interfaces/IHeaderType"

// Componente para el logo
const Logo = styled.img`
  width: 50px; /* Ajusta el tamaño según sea necesario */
  height: auto;
  margin-right: 1rem; /* Espacio entre el logo y el título */
`;

// Componente Nav estilizado con styled-components y Framer Motion
const Nav = styled(motion.nav)<{ theme: any; headerStyle: IHeaderStyle }>`
  position: ${(props)=> props.headerStyle.position};
  top: ${(props)=> props.headerStyle.top};
  left: ${(props)=> props.headerStyle.left};
  transform: ${(props)=> props.headerStyle.transform};
  max-width: ${(props)=> props.headerStyle.maxWidth};
  border: ${(props)=> props.headerStyle.border} ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  box-shadow: ${(props) => props.headerStyle.boxShadow};
  border-radius: ${(props) => props.headerStyle.borderRadius};
  padding: ${(props) => props.headerStyle.padding};
  display: ${(props)=> props.headerStyle.display};
  align-items: ${(props) => props.headerStyle.alignItems};
  justify-content: ${(props) => props.headerStyle.justifyContent};
  margin-bottom: ${(props)=> props.headerStyle.marginBottom};
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
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.buttonBackground};
    color: #fff;
  }
`;

const BuyButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const config = useConfig();
  const theme = config.theme;
  const selectedHeaderType = config.selectedHeaderType;
  const headerConfig = siteHeaderConfigJson.headerTypes;
  const siteTitle = config.siteConfig.siteTitle;
  const contractAddress = config.siteConfig.contractAddress;
  const selectedBlockchain = config.siteConfig.selectedBlockchain;
  const dexUrl = config.siteConfig.blockchainInstructions[selectedBlockchain]?.steps.find(
    (step: any) => step.url
  )?.url;

  const buyNowUrl = `${dexUrl ? dexUrl : ""}${contractAddress}`;

  // Obtener el estilo del encabezado seleccionado
  const selectedHeaderStyle = headerConfig.find(
    (header: IHeaderType) => header.name === selectedHeaderType
  )?.style;

  const navAnimation = selectedHeaderStyle?.navAnimation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavItemClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 180,
        behavior: "smooth",
      });
    }
  };

  return (
    <Nav
      theme={theme}
      headerStyle={selectedHeaderStyle || headerConfig[0].style} // Usar el estilo seleccionado o el predeterminado
      initial={navAnimation?.initial}
      animate={{
        ...navAnimation?.animate,
        width: isScrolled ? navAnimation?.animate.width : navAnimation?.initial.width,
        padding: isScrolled ? navAnimation?.animate.padding : navAnimation?.initial.padding,
      }}
      transition={navAnimation?.transition}
    >
      <NavContainer>
        <TitleContainer>
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
            <BuyButtonNav onClick={() => window.open(buyNowUrl, "_blank")} theme={theme}>
              Buy Now
            </BuyButtonNav>
          </BuyButtonContainer>
        </NavItemsContainer>
      </NavContainer>
    </Nav>
  );
};

export default Header;