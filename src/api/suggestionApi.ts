import { Skill } from "@/types";
import axiosClient from "./axiosClient";

const suggestionApi = {
  getAllJobCategories: async () => {
    const {
      data: { data },
    } = await axiosClient.get("/suggestion/categories");
    return data;
  },
  searchSkills: async (keyword: string, selectedSkill?: string[]): Promise<Skill[]> => {
    const params = new URLSearchParams({
      q: keyword,
      selected: selectedSkill ? selectedSkill.join(",") : "",
    });
    const { data } = await axiosClient.get(`/suggestion/skills?${params.toString()}`);
    return data.data as Skill[];
  },
};
export default suggestionApi;
