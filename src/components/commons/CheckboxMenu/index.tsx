import { FilterFilled, FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Popover, Row } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
type Option = {
  label: string;
  value: string | number;
};
type Props = {
  options: Array<any>;
  onChange: Function;
  keyword?: string;
  defaultValue?: Array<string | number>;
};

const CheckboxMenu = (props: Props) => {
  const [selectedItems, setSelectedItems] = useState<Array<string | number>>([]);
  useEffect(() => {
    if (props.defaultValue?.length) {
      setSelectedItems([...props.defaultValue]);
    }
  }, []);

  const onChange = (selection: any) => {
    setSelectedItems([...selection]);
    props.onChange(selection);
  };

  const clearSelected = () => {
    setSelectedItems([]);
    props.onChange([]);
  };
  const CheckboxRender = () => {
    const groups = props.options
      .map((e, i) => {
        return i % 7 === 0 ? props.options.slice(i, i + 7) : null;
      })
      .filter((e) => {
        return e;
      });
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Checkbox.Group onChange={onChange} defaultValue={selectedItems}>
          <Row>
            {groups.map((group: any, i) => {
              return (
                <Col key={"checkbox-group-" + i} span={Math.floor(24 / groups.length)}>
                  {group.map((e: Option, i: any) => {
                    return (
                      <Checkbox
                        key={e.value.toString() + i.toString()}
                        value={e.value}
                        style={{ display: "flex", margin: "10px" }}>
                        {e.label}
                      </Checkbox>
                    );
                  })}
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
        <Button type="primary" onClick={() => clearSelected()}>
          Clear
        </Button>
      </div>
    );
  };
  return (
    <Popover content={<CheckboxRender />} trigger="click" placement="bottomLeft">
      <Button style={{ marginLeft: "10px" }}>
        <div className={styles.abc}>
          {selectedItems.length === 0 ? (
            <FilterOutlined className={styles.icon} />
          ) : (
            <FilterFilled className={styles.icon} />
          )}
          {props.keyword ? props.keyword : "Keyword"}
          {selectedItems.length > 0 ? ` ( + ${selectedItems.length})` : ""}
        </div>
      </Button>
    </Popover>
  );
};

export default CheckboxMenu;
