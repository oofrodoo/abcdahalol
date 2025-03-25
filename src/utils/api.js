import axios from "axios";
import config from "../config/config";

export const donationApi = {
  getAllDonations: async () => {
    try {
      const response = await axios.get(`${config.API_URL}/donations`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDonation: async (formData) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/donations`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};
