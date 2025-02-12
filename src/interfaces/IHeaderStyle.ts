export default interface HeaderStyle {
  borderRadius?: string;
  boxShadow?: string;
  padding?: string;
  alignItems?: string;
  justifyContent?: string;
  borderBottom?: string;
  border?: string;
  maxWidth?: string;
  position?: string;
  top?: string;
  left?: string;
  transform?: string;
  display?: string;
  marginBottom?: string;
  navAnimation?: {
    initial: {
      width: string;
      padding: string;
    };
    animate: {
      width: string;
      padding: string;
    };
    transition: {
      duration: number;
    };
  };
}
