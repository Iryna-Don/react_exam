import {axiosInstance} from "../../axios/axiosInstance.ts";

export const sendRating = async (movieId: number, rating: number, sessionId: string) => {
    try {
        const response = await axiosInstance.post(
            `movie/${movieId}/rating?session_id=${sessionId}`,
            { value: rating }
        );
        console.log('Rating sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending rating:', error);
    }
};
