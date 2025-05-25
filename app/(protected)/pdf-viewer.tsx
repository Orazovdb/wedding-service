import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function PdfViewer() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();

  if (!uri || typeof uri !== "string") return null;

  const handleDownload = async () => {
    try {
      const filename = uri.split("/").pop() || "download.pdf";
      const localPath = FileSystem.documentDirectory + filename;
      const downloadRes = await FileSystem.downloadAsync(uri, localPath);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadRes.uri);
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        )}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownload} style={styles.button}>
          <Ionicons name="download" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  controls: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    gap: 16,
  },
  button: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },
});