export default interface SiteConfig {
    siteName: string;
    coinName: string;
    coinSymbol: string;
    contractAddress: string;
    siteTitle: string;
    selectedTheme: string;
    selectedBlockchain: string; 
    blockchainInstructions: Record<string, any>;
    tokenSupply: string;
    taxes: string;
    burntLP: string;
    homeDescription: string;
    aboutDescription: string;
    roadmap: {
      title: string;
      phases: Array<{
        phase: string;
        description: string;
      }>;
      disclaimer: string;
    };
    footerDescription: string;
    backgroundShape:string;
    marqueeText:string[];
    selectedHeader: string;
  }
  