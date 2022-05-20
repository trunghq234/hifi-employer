import suggestionApi from "@/api/suggestionApi";
import { Skill } from "@/types";
import { message, Select, Typography } from "antd";
import _debounce from "lodash.debounce";
import React, { useMemo, useRef, useState } from "react";
import Label from "../Label";
import Content from "./Content";
const { Title } = Typography;
const { Option } = Select;

interface IProps {
  style?: React.CSSProperties;
  value?: string[];
  onChange?: (value: string[]) => void;
}
export type messageType = "NotFound" | "Loading" | "Default";
const SkillsSearchSelect: React.FC<IProps> = (props: IProps) => {
  const { value, onChange } = props;
  const [data, setData] = useState<Skill[]>([]);
  const [messageType, setMessageType] = useState<messageType>("Default");
  const skillSelectRef = useRef<any>(null);

  const searchSkillCallApi = useMemo(
    () =>
      _debounce((keyword: string, selectedSkills: string[]) => {
        if (!keyword || keyword.length < 2) {
          setMessageType("Default");
          setData([]);
          return;
        }
        setMessageType("Loading");
        suggestionApi
          .searchSkills(keyword, selectedSkills)
          .then((data) => {
            if (data.length === 0) {
              setMessageType("NotFound");
            }
            setData(data);
          })
          .catch((err) => {
            message.error(err.message);
            setMessageType("Default");
          });
      }, 1000),
    [],
  );

  const handleSearch = async (keyword: string) => {
    if (!keyword || keyword.length < 2) setData([]);
    setMessageType("Loading");
    searchSkillCallApi(keyword, value ?? []);
  };
  const handleChange = (selectedValue: string[]) => {
    if (!selectedValue) return;

    onChange?.(selectedValue);
    skillSelectRef.current.blur();
    setData([]);
    setMessageType("Default");
  };
  return (
    <div>
      <Label text="Skill Tags" requiredMark />

      <Select
        loading={messageType === "Loading"}
        showSearch
        mode="multiple"
        ref={(select) => (skillSelectRef.current = select)}
        placeholder={"Please choose 2 skills"}
        onSearch={handleSearch}
        onChange={handleChange}
        size="large"
        onBlur={() => {
          setMessageType("Default");
        }}
        filterOption={false}
        notFoundContent={<Content messageType={messageType} />}>
        {data.map((d) => (
          <Option key={d._id}>{d.text}</Option>
        ))}
      </Select>
    </div>
  );
};

export default SkillsSearchSelect;
