import suggestionApi from "@/api/suggestionApi";
import { Category } from "@/types";
import { Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Label from "../Label";

const { Option, OptGroup } = Select;
const { Title } = Typography;
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

const JobCategory: React.FC<IProps> = ({ value, onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;
    (() => {
      suggestionApi.getAllJobCategories().then((data) => {
        if (mounted) {
          setCategories(data);
        }
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <Label text="Job category" requiredMark />
      <Select allowClear size="large" value={value} onChange={onChange}>
        {categories.map((cat) => (
          <OptGroup key={cat._id} label={cat.name}>
            {cat.subcategories.map((sub) => (
              <Option key={sub._id} value={sub._id}>
                {sub.name}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    </div>
  );
};

export default JobCategory;
