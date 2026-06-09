import API from "./api";

// ✅ Types (you can also import from types/index.ts)
export interface QuestionRequest {
  role: string;
  level: string;
  category: string;
}

export interface QuestionResponse {
  questions: string[];
}

// ✅ Advanced API function
export const getQuestions = async (
  data: QuestionRequest
): Promise<QuestionResponse> => {
  try {
    const response = await API.post<QuestionResponse>(
      "interview/questions/",
      data
    );

    return response.data;
  } catch (error: any) {
    console.error("API Error:", error);

    // Handle error properly
    if (error.response) {
      throw new Error(error.response.data?.message || "Server Error");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Something went wrong");
    }
  }
};
