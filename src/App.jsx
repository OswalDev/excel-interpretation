import  { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, Bar, Line } from "recharts";

function App() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const starIndex = 0;
  const endIndex = 10;

  const slicedArray = items.slice(starIndex,endIndex);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        //setting read file mode
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        //setting target sheet name
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
      setData(slicedArray)
      setFile(true)
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
            <th scope="col">Grade</th>
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

      {file && <div>
      <ComposedChart
          width={700}
          height={400}
          data={items.slice(0,10)}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="ASIGNATURA" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }} scale="band" />
          <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="GPA" stroke="#ff7300" />
        </ComposedChart>
      </div>}
    </div>
  );
}

export default App;