import Nav from "react-bootstrap/Nav";

interface Props {
  items: string[];
}

function NavigationItem({ items }: Props) {
  return (
    <>
      {items.map((item) => (
        <Nav.Link href={item}>{item}</Nav.Link>
      ))}
    </>
  );
}

export default NavigationItem;
