export const translateDisposition = (disposition: string) => {
  switch (disposition) {
    case "OnePlusOne":
      return "1+1";
    case "OneKK":
      return "1+kk";
    case "TwoPlusOne":
      return "2+1";
    case "TwoKK":
      return "2+kk";
    case "ThreePlusOne":
      return "3+1";
    case "ThreeKK":
      return "3+kk";
    case "FourPlusOne":
      return "4+1";
    case "FourKK":
      return "4+kk";
    case "FivePlusOne":
      return "5+1";
    case "FiveKK":
      return "5+kk";
    default:
      return disposition;
  }
};
