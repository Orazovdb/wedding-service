import { axiosWithAuth } from "../interceptors";

class VideoService {
	async getVideo(id: string) {
		const response = await axiosWithAuth.get<any>(`/videos/stream/${id}`, {
			headers: {
				Range: "bytes=400-100000"
			}
		});
		console.log("response", response);
		return response.data;
	}
}

export const videoService = new VideoService();
