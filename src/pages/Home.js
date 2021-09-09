import React from "react";
import { Grid, Row, Col } from "rsuite";
import Sidebar from "../components/Sidebar";
// eslint-disable-next-line arrow-body-style
const Home = () => {
  return (
    <Grid>
      <Row>
        <Col xs={24} md={8}>
          <Sidebar></Sidebar>
        </Col>
      </Row>
    </Grid>
  );
};

export default Home;
