import React, { useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import debounce from "lodash/debounce";

const createWorker = () =>
  new Worker(new URL("./filterWorker.worker.js", import.meta.url), {
    type: "module",
  });

// Generate 80,000 records
const generateData = () =>
  Array.from({ length: 80000 }, (_, i) => ({
    id: i + 1,
    name: `Record #${i + 1}`,
  }));

const Row = ({ index, style, data }) => (
  <div style={style} className="border-b px-2 py-1">
    {data[index].name}
  </div>
);

function App() {
  const [allData] = useState(generateData);
  const [filteredData, setFilteredData] = useState(allData);
  const [query, setQuery] = useState("");
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = createWorker();

    workerRef.current.onmessage = (e) => {
      setFilteredData(e.data);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleSearch = useMemo(
    () =>
      debounce((text) => {
        workerRef.current.postMessage({ query: text, data: allData });
      }, 300),
    [allData]
  );

  const onSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    handleSearch(val);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={onSearchChange}
        placeholder="Search records..."
        className="mb-4 w-full p-2 border rounded"
      />

      <List
        height={600}
        itemCount={filteredData.length}
        itemSize={35}
        width="100%"
        itemData={filteredData}
      >
        {Row}
      </List>
    </div>
  );
}

export default App;
