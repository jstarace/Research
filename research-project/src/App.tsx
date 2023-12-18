import ListGroup from "./components/ListGroup";

import "./App.css";

function App() {
  let items = ["New York", "San Francisco", "Rome", "Amsterdam", "Munich"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup items={items} heading="test" onSelectItem={handleSelectItem} />
    </div>
  );
}

export default App;
