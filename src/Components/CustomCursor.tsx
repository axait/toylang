import { useEffect, useState } from 'react'
import '../styles/CustomCursor.scss'


const CustomCursor = () => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const touchQuery = window.matchMedia("(pointer: coarse)");
        setIsTouch(touchQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
        touchQuery.addEventListener("change", handler);

        return () => touchQuery.removeEventListener("change", handler);
    }, [])

    useEffect(() => {
        const cursor = document.getElementById("cursor");

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        // Track mouse position
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        function animate() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            if (cursor) {
                cursor.style.left = cursorX + "px";
                cursor.style.top = cursorY + "px";
            }

            requestAnimationFrame(animate);
        }
        animate();

        // Mouse press/release events
        document.addEventListener("mousedown", () => {
            cursor?.classList.remove("cursor-slow-comeback");
            cursor?.classList.add("active");
        });

        document.addEventListener("mouseup", () => {
            cursor?.classList.add("cursor-slow-comeback");
            cursor?.classList.remove("active");
        });
    }, [])
    return (
        <>
            {!isTouch && <div className="cursor" id="cursor"></div>}
        </>
    )
}

export default CustomCursor
