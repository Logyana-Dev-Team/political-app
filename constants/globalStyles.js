import { COLORS,SIZES } from "./theme";

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // justifyContent: "center",
    // alignItems: "center",
  },
  systemInfoText: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: "#808080",
  },
  active: {
    fontWeight:'bold',
    letterSpacing:1,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 5 },
    textShadowRadius: 7,
  },
  inactive: {
    fontSize: SIZES.h4,
    color: "#2c2f33",
    letterSpacing:1
  },
  
};
