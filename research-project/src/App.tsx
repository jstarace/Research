import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";

function App() {
  let items = ["New York", "San Francisco", "Rome", "Amsterdam", "Munich"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <NavigationBar></NavigationBar>
    </>
  );
}

export default App;
