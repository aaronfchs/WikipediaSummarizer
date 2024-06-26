import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import React, { useState } from 'react';





function App() {
  const [keyword, setKeyword] = useState('');
  const [output, setOutput] = useState('');

  const runScript = async () => {
    try {
      const response = await fetch(`http://localhost:3002/search/:${keyword}`);
      const data = await response.text();
      setOutput(data);
      console.log(output)
    } catch (error) {
      console.error('Error running script:', error);
    }

    if (!searched) { setSearched(true) };
  };

  //offene Punkte: 
  //  - Datenbank befüllen
  //  - mit ChatGPT zusammenfassen
  //  - Text schön darstellen
  //  - ladeanzeige 
  //  - erneute Suche?




  const handleChange = (event) => { setKeyword(event.target.value); }

  const [searched, setSearched] = useState(false);

  return (
    <div className=" h-screen flex items-center justify-center">
      {searched &&
        <div className='grid grid-rows-6 w-full h-full'>
          <div className='row-span-1 flex border-b-2 border-black'>
            <div className='grid grid-cols-3 w-full'>
              <div className='cols-1 h-full'></div>
              <div className='cols-1 h-full flex items-center justify-center'>
                <div className='text-5xl'>
                  Überschrift
                </div>
              </div>
              <div className='cols-1 h-full flex items-center justify-end mr-4'>
                <div className="relative flex items-center justify-center">
                  <div className='flex border border-black rounded'>
                    <input
                      className="text-lg border-r border-black bg-transparent px-3 py-[0.5rem] focus:outline-none"
                      placeholder="...."
                      type="text"
                      value={keyword}
                      onChange={handleChange} />
                    <button
                      onClick={runScript}
                      className="px-3 pb-[6px] py-[0.5rem] text-lg focus:outline-none">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row-span-5 h-full w-full p-4 flex items-center justify-center'>
            <div className='border border-black rounded-md h-full w-full p-2'>
              <textarea className='w-full h-full p-1 focus:outline-none'>
                {output}
              </textarea>
            </div>
          </div>
        </div>
      }

      {!searched &&
        <div className="grid grid-rows-6 w-full h-full">
          <div className="row-span-1 flex items-center justify-center border-b-2 border-black">
            <div className="text-5xl">Überschrift</div>
          </div>
          <div className="row-span-5 flex items-start justify-center">
            <div className='grid grid-rows-4 w-full h-full'>

              <div className='row-span-1'></div>

              <div className='row-span-1'>
                <div className="relative flex items-center justify-center">
                  <div className='flex border border-black rounded'>
                    <input
                      className="text-lg border-r border-black bg-transparent px-3 py-[0.5rem] focus:outline-none"
                      placeholder="...."
                      type="text"
                      value={keyword}
                      onChange={handleChange} />
                    <button
                      onClick={runScript}
                      className="px-3 pb-[6px] py-[0.5rem] text-lg focus:outline-none">
                      Search
                    </button>
                  </div>

                </div>
              </div>

              <div className='row-span-2'></div>

            </div>
          </div>
        </div>
      }
    </div >

  );
}

export default App;
