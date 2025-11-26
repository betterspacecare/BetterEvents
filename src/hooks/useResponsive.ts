import { useWindowDimensions, Platform } from 'react-native';

export const useResponsive = () => {
    const { width } = useWindowDimensions();

    const isWeb = Platform.OS === 'web';
    const isLargeScreen = width > 768;
    const isTablet = width > 768 && width < 1024;
    const isDesktop = width >= 1024;

    return {
        isWeb,
        isMobile: !isLargeScreen,
        isTablet,
        isDesktop,
        isLargeScreen,
        // Helper for conditional styles
        web: (style: any) => (isLargeScreen ? style : {}),
        mobile: (style: any) => (!isLargeScreen ? style : {}),
    };
};
