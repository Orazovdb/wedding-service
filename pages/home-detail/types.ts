import { ImageSourcePropType } from 'react-native'

export type VideoSlide = {
	id: string;
	video: string;
};

export type ImageSlide = {
	id: string;
	image: ImageSourcePropType;
};

export type CategoryItem = {
	id: string;
	image: ImageSourcePropType;
	status: string;
};