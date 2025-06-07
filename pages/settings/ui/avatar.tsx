import { profileService } from "@/shared/api/services/profile.service";
import { Profile } from "@/shared/api/types";
import { useAppTheme } from "@/shared/hooks/use-app-theme";
import IconPen from "@/shared/icons/settings/pen-icon.svg";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

export const ProfileAvatar = ({
	data,
	refetch,
	isProvided
}: {
	data: Profile | undefined;
	refetch: () => void;
	isProvided: boolean | null;
}) => {
	const { t } = useTranslation();
	const { colors } = useAppTheme();
	const router = useRouter();
	const [name, setName] = useState<string>("");
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const toggleEdit = async () => {
		if (name !== "") {
			try {
				await profileService.updateProfile({ name: name });
				setIsEdit(false);
				refetch();
			} catch (error) {
				console.error("Failed to update profile:", error);
			} finally {
				setName("");
			}
		} else {
			setIsEdit(true);
		}
	};

	return (
		<View style={styles.avatarBlock}>
			<View style={styles.avatarContent}>
				<View style={styles.avatarName}>
					{isEdit ? (
						<TextInput
							placeholder=""
							value={name}
							onChangeText={setName}
							style={[
								styles.input,
								{ color: colors.text, borderColor: colors.text }
							]}
						/>
					) : (
						<Text style={[styles.avatarNameText, { color: colors.text }]}>
							{data?.data?.name}
						</Text>
					)}
					<TouchableOpacity
						onPress={toggleEdit}
						style={styles.avatarEditButton}
					>
						<IconPen />
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				onPress={() => router.push("/settings/settings-info")}
				style={styles.serviceButton}
			>
				<Text style={styles.serviceButtonText}>{t("addService")}</Text>
			</TouchableOpacity>
		</View>
	);
};

export const styles = StyleSheet.create({
	avatarBlock: {
		marginBottom: 24
	},
	avatar: {
		borderRadius: "50%",
		borderStyle: "dashed",
		borderColor: "#00000066",
		borderWidth: 1,
		width: 104,
		height: 104,
		alignItems: "center",
		justifyContent: "center"
	},
	avatarText: {
		marginTop: 8,
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		textAlign: "center",
		textDecorationLine: "underline"
	},

	avatarContent: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center"
	},
	avatarName: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		flex: 1
	},
	avatarNameText: {
		fontSize: 24,
		fontFamily: "Lexend-Medium"
	},

	avatarEditButton: {
		width: 27,
		height: 25,
		borderRadius: 4,
		backgroundColor: "#C0FFB9",
		justifyContent: "center",
		alignItems: "center"
	},
	serviceButton: {
		borderRadius: 6,
		backgroundColor: "#C0FFB9",
		maxWidth: "100%",
		height: 25,
		padding: 3,
		marginTop: 20
	},
	serviceButtonText: {
		fontSize: 14,
		fontFamily: "Lexend-Light",
		color: "#000000",
		textDecorationLine: "underline"
	},
	input: {
		height: 34,
		width: 200,
		padding: 4,
		borderWidth: 1,
		borderRadius: 4
	}
});
