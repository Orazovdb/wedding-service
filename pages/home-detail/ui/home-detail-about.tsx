import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const HomeDetailAbout = () => {
	return (
		<View style={styles.about}>
			<Text style={styles.title}>Men hakynda</Text>
			<View style={styles.row}>
				<Image
					source={require("@/shared/images/login/slider-1.png")}
					style={styles.image}
				/>
				<View style={styles.info}>
					<Text style={styles.name}>Mark Manson</Text>
					<Text style={styles.description}>
						Salam, ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur.
					</Text>
					<Text style={styles.meeting}>Hormatlamak bilen, Mark</Text>
				</View>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	about: {},
	title: {},
	row: {},
	image: {},
	info: {},
	name: {},
	description: {},
	meeting: {},
});
