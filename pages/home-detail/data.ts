import { CategoryItem, ImageSlide } from "./types";

export const FakeSlides: ImageSlide[] = [
	{
		id: "1",
		image: require("@/shared/images/login/slider-1.png")
	},
	{
		id: "2",
		image: require("@/shared/images/login/slider-2.png")
	},
	{
		id: "3",
		image: require("@/shared/images/login/slider-3.png")
	},
	{
		id: "4",
		image: require("@/shared/images/login/slider-3.png")
	},
	{
		id: "5",
		image: require("@/shared/images/login/slider-3.png")
	},
	{
		id: "6",
		image: require("@/shared/images/login/slider-3.png")
	}
];

export const FakeCards: CategoryItem[] = [
	{
		id: "1",
		image: require("@/shared/images/login/slider-1.png"),
		status: "static"
	},
	{
		id: "2",
		image: require("@/shared/images/login/slider-2.png"),
		status: "premium"
	},
	{
		id: "3",
		image: require("@/shared/images/login/slider-3.png"),
		status: "static"
	},
	{
		id: "4",
		image: require("@/shared/images/login/slider-3.png"),
		status: "static"
	},
	{
		id: "5",
		image: require("@/shared/images/login/slider-3.png"),
		status: "static"
	},
	{
		id: "6",
		image: require("@/shared/images/login/slider-3.png"),
		status: "static"
	},
	{
		id: "7",
		image: require("@/shared/images/login/slider-3.png"),
		status: "gold"
	},
	{
		id: "8",
		image: require("@/shared/images/login/slider-3.png"),
		status: "static"
	},
	{
		id: "9",
		image: require("@/shared/images/login/slider-3.png"),
		status: "new"
	}
];

export const FeedbackData = [
	{
		id: "1",
		title: "Bahalandyrma",
		possibilities: [
			"1 sag 10 tmt",
			"2 sag 20 tmt",
			"3 sag 30 tmt",
			"4 sag 40 tmt",
			"5 sag 50 tmt"
		]
	},
	{
		id: "2",
		title: "Bronlamak ucin",
		possibilities: ["1 hepde onunden bronlamaly"]
	},
	{
		id: "3",
		title: "Habarlashmak",
		possibilities: [
			"+993 61 993333",
			"+993 61 9933 33",
			"kerimkerimow@gmail.com"
		]
	}
];
