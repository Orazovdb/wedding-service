import { HumanServicesByIdData } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

interface Props {
	category_id: string | string[];
	data: HumanServicesByIdData | undefined;
}

export const SubscribersRecommendCategories = (props: Props) => {
	const { t } = useTranslation();
	const { colors, mode } = useAppTheme();
	const router = useRouter();
	return (
		<View style={styles.recommendCategories}>
			<Text style={[styles.recommendCategoriesTitle, { color: colors.text }]}>
				{t("recommendedServices")}
			</Text>
			<FlatList
				data={props.data?.similar?.[0]?.categories ?? []}
				keyExtractor={item => item?.id.toString()}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.categoryItem,
							Number(props.category_id) === item?.id
								? styles.categoryItemActive
								: null
						]}
						onPress={() => router.push(`/categories/${item?.id}/all`)}
					>
						{/* <Image source={{ uri: item.icon }} style={styles.categoryIcon} /> */}
						<Text
							style={[
								styles.categoryItemText,
								{ color: colors.text },
								Number(props.category_id) === item?.id
									? styles.categoryItemTextActive
									: null
							]}
						>
							{item?.name}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	recommendCategories: {
		marginLeft: 16
	},
	recommendCategoriesTitle: {
		fontSize: 16,
		fontFamily: "Lexend-Regular",
		color: "#000000",
		marginBottom: 26
	},

	categoryList: {
		marginBottom: 12,
		paddingLeft: 20
	},
	categoryItem: {
		backgroundColor: "#0000001A",
		height: 35,
		minWidth: 77,
		borderRadius: 6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginRight: 10,
		paddingHorizontal: 6
	},
	categoryItemActive: {},
	categoryItemText: {
		color: "#000000",
		fontFamily: "Lexend-Light",
		fontSize: 14
	},
	categoryItemTextActive: {},
	categoryIcon: { width: 18, height: 18 }
});
