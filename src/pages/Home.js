import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Home() {
    const [input, setInput] = useState('');
    const [keywords, setKeywords] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchKeywords();
    });

    const fetchKeywords = async () => {
        try {
            const response = await fetch('http://localhost:3002/keywords');
            const data = await response.json();
            setKeywords(data);
        } catch (error) {
            console.error('Error fetching keywords:', error);
        }
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

    const handleChange = (event) => { setInput(event.target.value); }

    const handleSearch = (keyword) => {
        navigate(`/result?keyword=${keyword}`);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-cyan-800 text-white">
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
                                        onClick={() => handleSearch(input)}
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
                                            onClick={() => handleSearch(keyword.keyword)}
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
        </div>
    )
}

export default Home