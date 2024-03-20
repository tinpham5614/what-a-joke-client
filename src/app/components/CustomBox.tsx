import { BoxProps } from "@mui/material";

const styles = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const CustomBox: React.FC<BoxProps> = ({children}) => {
    return (
        <div style={styles}>
        {children}
        </div>
    );
}

export default CustomBox;