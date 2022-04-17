type User = {
  _id: string;
  uid: string;
  signInProvider: string;
  type: string;
  email: string;
  name: string;
  photoUrl: string;
};

type Company = {
  _id: string;
  email: string;
  name: string;
  phoneNumber: string;
  industries: Subcategory[];
  address: string;
  locations: WorkLocation[];
  size: string;
  contactName: string;
  summary: string;
  accountStatus: "pending" | "rejected" | "fullfilled";
};

type Post = Partial<{
  title: string;
  jobType: string;
  categories: string[];
  salary: Salary;
  description: string;
  skillTags: Skill[];
  preferedLangs: string[];
  locations: WorkLocation[];
  photoFile: any;
  postPhoto: string;
}>;
type Skill = {
  _id: string;
  text: string;
};
type Category = {
  _id: string;
  name: string;
  subcategories: Subcategory[];
};
type Subcategory = {
  _id: string;
  name: string;
};

type Salary = {
  min?: number;
  max?: number;
  unit: "vnd" | "usd";
  negotiable?: boolean;
};

type WorkLocation = {
  id: string;
  officeName?: string;
  city?: string;
  address?: string;
};
export type { User, Company, Post, Salary, Skill, WorkLocation, Category, Subcategory };
