import { Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Category } from "@/types";
import suggestionApi from "@/api/suggestionApi";

const { Option, OptGroup } = Select;
const { Title } = Typography;
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CompanyIndustriesSelect: React.FC<IProps> = ({ value, onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;
    (() => {
      suggestionApi.getAllJobCategories().then((data) => {
        if (mounted) {
          setCategories(data);
          console.log(data);
        }
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <Select mode="multiple" allowClear value={value} onChange={onChange} showArrow>
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

export default CompanyIndustriesSelect;
