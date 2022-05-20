type User = {
  _id: string;
  uid: string;
  signInProvider: string;
  email: string;
  isVerified: boolean;
  name: string;
  birthDate: string;
  photoUrl: string;
  phoneNumber: string;
  address: string;
  age: number;
  gender: string;
  nationality: string;
  about: string;
  skills: Skill[];
  resume: Resume;
  socialNetwork: { facebook: String; linkedIn: String; github: String; twitter: String };
  candidateStatus: string;
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
  category: string;
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

type Resume = {
  fileName: string;
  url: string;
};

type Application = {
  _id: string;
  userId: string;
  postId: string;
  user: User;
  status: string;
  coverLetter: string;
  phoneNumber: string;
  resume: Resume;
};

export type {
  User,
  Company,
  Post,
  Salary,
  Skill,
  WorkLocation,
  Category,
  Subcategory,
  Application,
  Resume,
};
