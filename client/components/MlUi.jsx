import React, { useState, useEffect } from 'react';

function MlUi({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [displayedImages, setDisplayedImages] = useState(images);

    const handleImageSelect = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const newImages = [reader.result, ...displayedImages];
                setSelectedImage(reader.result);
                setCurrentImageIndex(0);
                setDisplayedImages(newImages);
            };
        }
    };

    const handleImageRemove = () => {
        setSelectedImage(null);
        setSelectedStyle(null);
    };

    const handleStyleChange = (event) => {
        setSelectedStyle(event.target.value); 
    };

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []); 

    return (
        <div className="p-8 flex flex-col items-center min-h-screen bg-white">
            <div className="flex justify-center items-center mb-8 overflow-x-auto">
                {displayedImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className="w-40 h-40 mx-4 cursor-pointer border border-gray-300 rounded-lg"
                        onClick={() => handleImageSelect(image, index)}
                    />
                ))}

                <label
                    htmlFor="file-upload"
                    className="w-40 h-40 mx-4 cursor-pointer border border-gray-300 rounded-lg flex justify-center items-center"
                >
                    <span className="text-yellow-500 opacity-75">
                        <svg
                            className="w-24 h-24 animate-bounce"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="0.7"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </span>
                </label>
                <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInputChange}
                />
            </div>
            <div className="w-full md:w-3/4 relative border border-gray-300 bg-gray-100 rounded-lg overflow-hidden">
                {selectedImage && (
                    <div className="flex justify-center items-center">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="max-h-96 max-w-full"
                        />
                    </div>
                )}
                {!selectedImage && (
                    <div className="flex justify-center items-center h-96">
                        <span className="text-gray-400 opacity-75">
                            <svg className="w-24 h-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.7" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </span>
                    </div>
                )}
            </div>
            <div className="w-full md:w-3/4 mt-4 flex justify-center items-center">
                <button
                    className="inline-flex items-center shadow-md px-4 py-2 bg-yellow-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    onClick={handleImageRemove}
                    disabled={!selectedImage}
                >
                    Remove image
                </button>
                <select
                    id="restaurantImage"
                    className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-4 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    onChange={handleStyleChange}
                >
                    <option>Select FaceStylizer</option>
                    <option value="image1">STYLE 1</option>
                    <option value="image2">STYLE 2</option>
                    <option value="image3">STYLE 3</option>
                </select>

                {selectedStyle && (
                    <button
                        className="inline-flex items-center shadow-md px-4 py-2 bg-yellow-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                        onClick={() => console.log("Submitted")} 
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}

export default MlUi;
