import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Category } from "@/types";
import suggestionApi from "@/api/suggestionApi";

const { Option, OptGroup } = Select;

interface IProps {
  value?: any;
  onChange?: (value: string) => void;
}

const CompanyIndustriesSelect: React.FC<IProps> = ({ value, onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [defaultValue, setDefaultValue] = useState<any>([]);

  useEffect(() => {
    let mounted = true;
    (() => {
      suggestionApi.getAllJobCategories().then((data) => {
        if (mounted) {
          setCategories(data);
        }
        const tmp = value.map((e: { _id: any }) => e._id);
        setDefaultValue(tmp);
        // console.log(tmp);
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Select
      mode="multiple"
      allowClear
      value={value}
      defaultValue={"6236a8b7c4b1400ea3711319"}
      onChange={onChange}
      showArrow>
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
  );
};

export default CompanyIndustriesSelect;
