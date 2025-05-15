import type { Categories } from "@/shared/api/types";
import type { ImageSourcePropType } from "react-native";

export type CategoryItem = {
	id: string;
	image: ImageSourcePropType;
	status: string;
};

export type HomeFeeds = {
	id: number;
	link: number;
	image: string;
};

export type Home = {
	homeFeeds: HomeFeeds[];
	categories: Categories[];
};
