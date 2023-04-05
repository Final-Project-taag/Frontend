import React from 'react'


function AboutUs() {

    return (
        <>
            <div>
                <div className='text-center bg-black-500  mb-6' >
                    <h1 className=' text-start text-xl font-bold ml-12'>About Us</h1>
                    <h3 className='text-emerald-600 text-xl font-bold mb-4' >  Welcome to Green-Wheels GmbH!  <br /> <p className='text-yellow-700'> You will enjoy a service more than your Expectation! </p></h3>

                    <p className='font-sans  text-center ml-10 mr-10' ml-10 >Unser Ziel ist es, unseren Kunden die neuesten Elektrofahrzeuge anzubieten. Wir haben einen langen Weg hinter uns und wissen daher am besten, wie wir Sie mit modernen, ökologischen und dennoch preiswerten Mietfahrzeugen begeistern können. Wir bieten all dies bei gleichzeitig exzellentem Kundenservice und freundlichem Support.</p>

                </div>
                <div className=' flex flex-col text-center text-lime-700  mb-4 '>
                    <h4 className='mb-2 font-semibold ' >Our Green Dream Team</h4>

                    <span>Gabriella</span>
                    <span>Ahmad</span>
                    <span>Ammar</span>
                    <span>Tenaw</span>

                </div>


                <h2 className='text-center  text-yellow-700 font-semibold mb-4 ' >und was wir Ihnen anbieten können!</h2>


                <div className='flex flex-row mx-2'>
                    <div className='basis-1/3'>
                        <span className='text-blue-600' >Elektro Auto</span>
                        <img className='object-cover h-49 w-96 min-h-full' src={'/images/autos_04.jpg'} alt="Elektro Autos" />
                    </div>

                    <div className='basis-1/3' >
                        <span className='ml-9 text-blue-600' >Elektrische Motorraeder</span>
                        <img className='object-cover h-49 w-96 min-h-full ml-9 mr-20' src={'/images/motorrad_05.jpg'} alt="Elektrische Motorraeder" />
                    </div>

                    <div className='basis-1/3 ' >
                        <p className='ml-16 text-blue-600' >Elektroroller</p>
                        <img className='object-cover h-49 w-96 ml-16' src={'/images/scooter_05.jpg'} alt="Elektroroller" />
                    </div>
                </div>
            </div>

        </>
    );
}

export default AboutUs;