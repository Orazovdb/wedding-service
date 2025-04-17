import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const SearchIcon = ({ width = 14, height = 15, color = "black" }) => {
	return (
		<Svg width={width} height={height} viewBox="0 0 14 15" fill="none">
			<G clipPath="url(#clip0_591_3546)">
				<Path
					d="M6 12C9.03757 12 11.5 9.53757 11.5 6.5C11.5 3.46243 9.03757 1 6 1C2.96243 1 0.5 3.46243 0.5 6.5C0.5 9.53757 2.96243 12 6 12Z"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M13.5 14L10 10.5"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_591_3546">
					<Rect
						width="14"
						height="14"
						fill="white"
						transform="translate(0 0.5)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default SearchIcon;
