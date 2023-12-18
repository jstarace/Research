import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import NavigationItem from "./NavigationItems/NavigationItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// <Nav.Link href="#home">Home</Nav.Link>
// <Nav.Link href="#link">Projects</Nav.Link>
// <Nav.Link href="#link">Publications</Nav.Link>
// <Nav.Link href="#link">About</Nav.Link>
// <Nav.Link href="#link">Special Thanks</Nav.Link>

function NavigationBar() {
  let items = ["Home", "Projects", "Publications", "About", "Special Thanks"];
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavigationItem items={items} />
            <NavDropdown title="More Info" id="basic-nav-dropdown">
              <NavDropdown.Item href="www.linkedin.com/in/jason-starace-66b69b58">
                LinkedIn
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Special Thanks
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
          <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
