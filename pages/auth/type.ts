import { ImageSourcePropType } from "react-native";

export type SlidesType = {
	id: string;
	text?: string | undefined;
	image?: ImageSourcePropType | undefined;
	contentTitle?: string | undefined;
	contentImage?: React.ReactNode | undefined;
};
