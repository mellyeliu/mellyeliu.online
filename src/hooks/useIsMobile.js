import useMediaQuery from "./useMediaQuery";

const useIsMobile = () => useMediaQuery("(max-width: 767px)");

export default useIsMobile;
