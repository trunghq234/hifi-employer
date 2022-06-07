import LoginForm from "@/components/Login/LoginForm";
import LocationMaps from "@/components/Setting/LocationMaps";
import WorkAddressInput from "@/components/Setting/WorkAddressInput";
import SideBar from "@/components/SideBar";
import { Col, Row } from "antd";
import React from "react";

type Props = {};
const key = "AIzaSyDPdvqCxbITBzkWxvbllxTP4tb82vKKKxQ";

const Loginpage = (props: Props) => {
  return (
    <Row className="rounded-md max-h-screen">
      {/* <Col span={4}>
        <WorkAddressInput />
      </Col>
      <Col span={14}>
        <LocationMaps
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Col> */}
      <Col span={8}>
        <SideBar />
      </Col>
      <Col span={16}>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Loginpage;
