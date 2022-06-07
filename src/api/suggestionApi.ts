import { Skill } from "@/types";
import axiosInstance from "./axiosIns";

const suggestionApi = {
  getAllJobCategories: async () => {
    const {
      data: { data },
    } = await axiosInstance.get("/suggestion/categories");
    return data;
  },
  getSkills: async (ids: string[]) => {
    const { data } = await axiosInstance.get(`/suggestion/skills?ids=${ids.join(",")}`);
    return data.data as Skill[];
  },
  searchSkills: async (keyword: string, selectedSkill?: string[]): Promise<Skill[]> => {
    const params = new URLSearchParams({
      q: keyword,
      selected: selectedSkill ? selectedSkill.join(",") : "",
    });
    const { data } = await axiosInstance.get(`/suggestion/skills?${params.toString()}`);
    return data.data as Skill[];
  },
};
export default suggestionApi;
