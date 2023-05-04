import { useState, useEffect } from 'react';

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial size

        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect only runs on mount and unmount

    return windowSize;
}