import { servicesService } from "@/shared/api/services/services.service";
import { HumanServices } from "@/shared/api/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Text,
	View
} from "react-native";

const { height, width } = Dimensions.get("window");
const PAGE_SIZE = 6;
const NUM_COLUMNS = 2;
const SLIDE_HEIGHT = height;

const fetchPageData = async (page: number): Promise<HumanServices[]> => {
	const params = {
		category_ids: undefined,
		subcategory_ids: undefined,
		name: undefined,
		provinces: undefined,
		statuses: undefined,
		page: page
	};
	const response = await servicesService.getServices(params);
	return response.data;
};

const Slide: React.FC<{ items: HumanServices[] }> = ({ items }) => (
	<View
		style={{ height: SLIDE_HEIGHT, flexDirection: "row", flexWrap: "wrap" }}
	>
		{items.map(item => (
			<View
				key={item.id}
				style={{
					width: width / NUM_COLUMNS,
					height: SLIDE_HEIGHT / 3,
					justifyContent: "center",
					alignItems: "center",
					borderWidth: 1,
					borderColor: "#ccc"
				}}
			>
				<Text>{item.name}</Text>
			</View>
		))}
	</View>
);

const BulletIndicator: React.FC<{ total: number; current: number }> = ({
	total,
	current
}) => (
	<View
		style={{
			flexDirection: "row",
			justifyContent: "center",
			marginVertical: 10
		}}
	>
		{Array.from({ length: total }, (_, i) => (
			<View
				key={i}
				style={{
					width: 8,
					height: 8,
					borderRadius: 4,
					backgroundColor: i + 1 === current ? "#000" : "#ccc",
					marginHorizontal: 4
				}}
			/>
		))}
	</View>
);

const PaginatedSlider = () => {
	const route = useRoute<any>();
	const navigation = useNavigation();
	const [data, setData] = useState<HumanServices[][]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState<number>(Number(route.params?.page || 1));

	const loadPage = async (pageToLoad: number) => {
		setLoading(true);
		try {
			const items = await fetchPageData(pageToLoad);
			const pages: HumanServices[][] = [];
			for (let i = 0; i < items.length; i += PAGE_SIZE) {
				pages.push(items.slice(i, i + PAGE_SIZE));
			}
			setData(prev => {
				const newData = [...prev];
				newData[pageToLoad - 1] = pages[0];
				return newData;
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadPage(page);
	}, [page]);

	const onViewableItemsChangedRef = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			const index = viewableItems[0].index;
			if (index !== undefined) {
				const newPage = index + 1;
				if (newPage !== page) {
					setPage(newPage);
					(navigation as any).setParams?.({ page: newPage });
				}
			}
		}
	});

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 70
	};

	return (
		<>
			{loading && data.length === 0 ? (
				<ActivityIndicator size="large" style={{ marginTop: 50 }} />
			) : (
				<>
					<FlatList
						data={data}
						renderItem={({ item }) => <Slide items={item} />}
						keyExtractor={(_, index) => index.toString()}
						pagingEnabled
						horizontal={false}
						showsVerticalScrollIndicator={false}
						onViewableItemsChanged={onViewableItemsChangedRef.current}
						viewabilityConfig={viewabilityConfig}
						getItemLayout={(_, index) => ({
							length: SLIDE_HEIGHT,
							offset: SLIDE_HEIGHT * index,
							index
						})}
					/>
					<BulletIndicator total={data.length} current={page} />
				</>
			)}
		</>
	);
};

export default PaginatedSlider;
