import React, { useState } from 'react';
import { Table } from 'lucide-react';
import { truthTable } from '../components/truthTable/logic';

function getTruthTableData(expr) {
  const { vars, rows } = truthTable(expr);

  const columns = [...vars, "RESULT"];

  const tableRows = rows.map((row) => {
    const obj = {};
    for (const v of vars) obj[v] = row[v] ? 1 : 0;
    obj.RESULT = row.result ? 1 : 0;
    return obj;
  });

  return { columns, tableRows };
}

const TruthTableGenerator = () => {
  const [expression, setExpression] = useState('');
  const [tableData, setTableData] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = () => {
    try {
      setError(null);
      if (!expression.trim()) return;
      const data = getTruthTableData(expression);
      setTableData(data);
    } catch (err) {
      console.error(err);
      setTableData(null);
      setError("Invalid expression. Please check your syntax.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[60vh]">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-50 rounded-xl">
           <Table className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Truth Table Generator</h1>
           <p className="text-slate-500">Generate tables from boolean expressions.</p>
        </div>
      </div>
      
      <div className='flex flex-col justify-center items-center mb-8 gap-4'>
        <input 
          type="text" 
          placeholder='ex: A & B | !C'
          className="focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex-1 md:min-w-md px-4 py-2 border border-slate-300 rounded-lg outline-none duration-200"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button 
          className='px-6 py-2 bg-slate-100 text-black font-medium rounded-lg hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] duration-200 focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]' 
          onClick={handleGenerate}
        >
          Generate
        </button>
      

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 text-center border border-red-100">
          {error}
        </div>
      )}

      {tableData && (
        <div className=" md:min-w-md overflow-x-auto rounded-lg border border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {tableData.columns.map((col) => (
                  <th key={col} className="px-6 py-3 text-sm font-semibold text-slate-600">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.tableRows.map((row, idx) => (
                <tr key={idx} className="border-b last:border-0 border-slate-100 hover:bg-slate-50">
                  {tableData.columns.map((col) => (
                    <td key={col} className={`px-6 py-3 text-sm ${col === 'RESULT' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default TruthTableGenerator;
