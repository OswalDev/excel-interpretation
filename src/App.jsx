import  { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);
  const starIndex = 0;
  const endIndex = 10;

  const slicedArray = items.slice(starIndex,endIndex);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
      console.log(d[0]['ASIGNATURA'])
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
            <th scope="col">GPA</th>
          </tr>
        </thead>
        <tbody>
          {slicedArray.map((d) => (
            <tr key={d.ASIGNATURA}>
              <th>{d.ASIGNATURA}</th>
              <td>{d.DEFINITIVA}</td>
              <td>{d.GPA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;