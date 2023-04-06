import React, { useState } from 'react';


function Card({ imageUrl, paragraph }) {


    return (
        <div className="flex justify-center">
            <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                <a href="#!">
                    <img className="rounded-t-lg" src={imageUrl} alt="" />
                </a>
                <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        Card
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        {paragraph}
                    </p>
                    <button
                        type="button"
                        className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}

function CardGrid() {
    const images = [
        "/images/vw_ID3.webp",
        "/images/vw_Id4.webp",
        "/images/vw_Id5_SUV.avif",
        "/images/autos_01.jpg",
        "/images/autos_02.jpg",
        "/images/autos_03.jpg" 
         
    ];

    const [paragraphs, setParagraphs] = useState([
        'Tesla Model 3',
        'Paragraph 2 content',
        'Paragraph 3 content',
        'Paragraph 4 content',
        'Paragraph 5 content',
        'Paragraph 6 content',
      ]);
    

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((image, index ) => (
                <div key={image} className="col-span-1">
                    <Card imageUrl={image} paragraph={paragraphs[index]} />
                </div>
            ))}
        </div>
    );
}

export default CardGrid;