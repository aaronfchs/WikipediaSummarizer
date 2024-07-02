import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchKeywords();
  }, [trigger]);

  const fetchKeywords = async () => {
    try {
      const response = await fetch('http://localhost:3002/keywords');
      const data = await response.json();
      setKeywords(data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  const runScript = async (keyword) => {
    try {
      const response = await fetch(`http://localhost:3002/search/:${keyword}`);
      const data = await response.text();
      setOutput(JSON.parse(data));
    } catch (error) {
      console.error('Error running script:', error);
    }

    if (!searched) { setSearched(true) };
    setInput('')
    setTrigger(!trigger);
  };

  const deleteKeyword = async (id) => {
    try {
      await fetch(`http://localhost:3002/keywords/delete/${id}`, {
        method: 'DELETE',
      });
      fetchKeywords();
    } catch (error) {
      console.error('Error deleting keyword:', error);
    }
  };

  //offene Punkte:
  // - ladeanzeige ()
  // - react router ()

  const handleChange = (event) => { setInput(event.target.value); }

  const [searched, setSearched] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-cyan-800 text-white">
      {searched &&
        <div className="grid grid-rows-6 w-full h-full">
          <div className="row-span-1 flex border-b-2 border-white">
            <div className="grid grid-cols-3 w-full">
              <div className="col-span-1 h-full"></div>
              <div className="col-span-1 h-full flex items-center justify-center">
                <div className="text-5xl">Suchergebnis</div>

              </div>
              <div className="col-span-1 h-full flex items-center justify-end p-4">
                <div className="relative flex items-center justify-center">
                  <div className="flex border border-white rounded">
                    <input
                      className="text-lg border-r border-white bg-transparent py-[0.5rem] focus:outline-none"
                      placeholder="...."
                      type="text"
                      value={input}
                      onChange={handleChange}
                    />
                    <button
                      onClick={() => runScript(input)}
                      className="px-3 pb-[6px] py-[0.5rem] text-lg focus:outline-none"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-5 h-full w-full flex items-center justify-center bg-cyan-700 p-4">
            <div className="grid grid-cols-5 w-full h-full">
              <div className="col-span-4 flex items-center justify-center overflow-hidden">
                <div className="h-full w-full flex flex-col">
                  <div className="text-3xl mb-2">
                    {output.title}
                  </div>
                  <div className="h-full w-full flex flex-grow overflow-y-auto">
                    <textarea
                      className="w-full h-full p-1 focus:outline-none resize-none bg-cyan-700"
                      value={output.content}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 h-full flex overflow-hidden">
                <div className="grid-cols-1 w-full pl-5 overflow-y-auto">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="mb-3 mt-1 border border-white rounded p-2 flex">
                      <button
                        className="text-left flex-grow"
                        onClick={() => runScript(keyword.keyword)}
                      >
                        {keyword.keyword}
                      </button>
                      <button
                        onClick={() => deleteKeyword(keyword.id)}
                        className="text-right"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {!searched &&
        <div className="grid grid-rows-6 w-full h-full">
          <div className="row-span-1 flex items-center justify-center border-b-2 border-white">
            <div className="text-5xl">Überschrift</div>
          </div>
          <div className="row-span-5 flex items-start justify-center bg-cyan-700">
            <div className="grid grid-rows-4 w-full h-full">
              <div className="row-span-1"></div>
              <div className="row-span-1">
                <div className="relative flex items-center justify-center">
                  <div className="flex border border-white rounded">
                    <input
                      className="text-lg border-r border-white bg-transparent px-3 py-[0.5rem] focus:outline-none"
                      placeholder="...."
                      type="text"
                      value={input}
                      onChange={handleChange}
                    />
                    <button
                      onClick={() => runScript(input)}
                      className="px-3 pb-[6px] py-[0.5rem] text-lg focus:outline-none"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="row-span-2 p-8 overflow-hidden">
                <div className='h-full w-full grid grid-cols-7 grid-rows-6 gap-2 overflow-y-auto mt-10'>
                  {keywords.map((keyword, index) => (
                    <div key={index} className="mb-4 mx-2 border border-white rounded p-4 flex items-center justify-between">
                      <button
                        className="text-left flex-grow"
                        onClick={() => runScript(keyword.keyword)}
                      >
                        {keyword.keyword}
                      </button>
                      <button
                        onClick={() => deleteKeyword(keyword.id)}
                        className="text-right"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
