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
      // console.log(d[0]['ASIGNATURA'])
    });
  };

  return (
    <div className="bg-cream">
      <h1>Excel Data Visualization</h1>

      <div className="">
        <h3>Insert xlsx file</h3>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
      </div>

      <table className="table container">
        <thead>
          <tr className="text-center">
            <th scope="col">Item</th>
            <th scope="col">Description</th>
            <th scope="col">GPA</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {slicedArray.map((d) => (
            <tr key={d.ASIGNATURA}>
              <th className="text-center">{d.ASIGNATURA}</th>
              <td className="text-center">{d.DEFINITIVA.toFixed(2)}</td>
              <td className="text-center">{d.GPA.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;