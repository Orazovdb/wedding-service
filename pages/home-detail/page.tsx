import { servicesService } from "@/shared/api/services/services.service";
import { HumanServicesByIdData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import i18n from "@/shared/i18n";
import ArrowLeftBigIcon from "@/shared/icons/arrow-left-big.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import { HomeDetailAbout } from "./ui/home-detail-about";
import { HomeDetailBanner } from "./ui/home-detail-banner";
import { HomeDetailContact } from "./ui/home-detail-contact";
import { HomeDetailFeedback } from "./ui/home-detail-feedback";
import { HomeDetailProfile } from "./ui/home-detail-profile";
import { HomeDetailSameServices } from "./ui/home-detail-same-services";

const { width } = Dimensions.get("window");

export const HomeDynamicScreen = () => {
	const currentLang = i18n.language;
	const { colors, mode } = useAppTheme();

	const { id } = useLocalSearchParams();
	const [data, setData] = useState<HumanServicesByIdData>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await servicesService.getServicesById(
				id as string,
				currentLang
			);
			if (result) {
				setData(result);
			}
		};

		fetchData();
	}, []);

	const router = useRouter();

	const onToggleFollow = async () => {
		await servicesService.toggleFollowService({ service_id: Number(id) });

		const result = await servicesService.getServicesById(
			id as string,
			currentLang
		);
		if (result) {
			setData(result);
		}
	};

	const onToggleSimilarFollow = async () => {
		await servicesService
			.getServicesById(id as string, currentLang)
			.then(setData);
	};

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.bgPage }]}>
			{data?.service.videos.length || data?.service.images.length ? (
				<HomeDetailBanner data={data} />
			) : null}
			<TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
				<ArrowLeftBigIcon />
			</TouchableOpacity>
			<HomeDetailProfile data={data} onToggleFollow={onToggleFollow} />
			<HomeDetailAbout data={data} />
			{data?.service.pricing[0] !== "" ||
			data?.service.booking[0] !== "" ||
			data?.service.contacts[0] !== "" ? (
				<HomeDetailFeedback data={data} />
			) : null}
			<HomeDetailContact data={data} />
			{data?.similar.length ? (
				<HomeDetailSameServices
					onToggleFollow={onToggleSimilarFollow}
					data={data}
				/>
			) : null}
		</ScrollView>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	sliderContainer: {
		position: "relative",
		flexGrow: 1,
		width: width
	},
	backIcon: {
		position: "absolute",
		top: 12,
		left: 10,
		zIndex: 10,
		paddingVertical: 2,
		paddingHorizontal: 6,
		backgroundColor: "#00000099",
		borderRadius: 4
	}
});
