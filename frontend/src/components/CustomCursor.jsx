import React, { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
	const cursorRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

		const editCursor = (e) => {
			const { clientX: x, clientY: y } = e;
			cursor.style.left = x + "px";
			cursor.style.top = y + "px";
		};

		const handleMouseMove = (e) => {
			editCursor(e);
			
			// Use computed style to detect 'cursor: pointer' - the most reliable way to find clickable things
			const target = e.target;
			const isPointer = window.getComputedStyle(target).cursor === 'pointer';
			const isClickableTag = target.closest('button, a, [role="button"], input, textarea, select, .hover-this');
			
			const hovering = isPointer || !!isClickableTag;
			
			// Only update state if it actually changed to prevent unnecessary re-renders
			setIsHovering(prev => prev !== hovering ? hovering : prev);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			className={`cursor ${isHovering ? "cursor-hover" : ""}`}
			style={{
				pointerEvents: "none",
				position: "fixed",
				padding: "0.3rem",
				backgroundColor: "#fff",
				borderRadius: "50%",
				mixBlendMode: "difference",
				transition: "transform 0.3s ease",
				zIndex: 9999,
				transform: isHovering ? "translate(-50%, -50%) scale(8)" : "translate(-50%, -50%) scale(1)",
			}}
		/>
	);
};

export default CustomCursor;
