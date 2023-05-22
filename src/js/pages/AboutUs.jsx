import React from "react";


const developers = [
  {
    name: "Gabriella",
    cite: "Hannover",
    image: "/team/Gabriella1.webp",
  },
  {
    name: "Ahmad",
    cite: "Mannheim",
    image: "/team/Ahmad1.webp",
  },
  {
    name: "Ammar",
    cite: "Freiburg",
    image: "/team/Ammar1.webp",
  },
  {
    name: "Tenaw",
    cite: "Berlin",
    image: "/team/tenaw1.webp",
  },
];

function AboutUs() {
  return (
    
      <div className=" flex  h-full  flex-col container  bg-cover bg-center md:bg-[url('/images/Bg-About-Us-Team.jpg')] dark:bg-none  md:min-h-screen">
        <div className="flex h-full   md:min-h-screen flex-col text-center bg-gray-100 dark:bg-slate-900 dark:bg-opacity-0 bg-opacity-90   pb-20  pt-20  ">
          <h1 className="text-green-600  dark:text-green-500  text-3xl lg:text-6xl lg:p-6 pt-10  ">
            Green <span className=" text-gray-600">Wheels</span> Team{" "}
          </h1>
          <p className="font-sans tracking-wider text-left  md:text-2xl lg:text-center mx-10 dark:text-gray-300">
            Willkommen auf unserer Teamseite! Wir sind ein engagiertes Team von
            Entwicklern, die sich dafür einsetzen, die Umwelt zu schützen, indem
            wir moderne und ökologische Transportlösungen anbieten. Wir glauben,
            dass jeder seinen Teil dazu beitragen kann, die Natur zu erhalten und
            die Auswirkungen des Klimawandels zu verringern. Deshalb bieten wir
            unseren Kunden die neuesten Elektrofahrzeuge an, damit sie
            umweltfreundlicher unterwegs sein können. Unsere Mission ist es, eine
            nachhaltige Zukunft zu schaffen, indem wir den Übergang zu
            Elektrofahrzeugen erleichtern und den CO2-Fußabdruck verringern. Wir
            sind stolz darauf, unseren Kunden nicht nur eine umweltfreundliche
            Option zu bieten, sondern auch einen exzellenten Kundenservice und
            Unterstützung zu gewährleisten. Wir sind hier, um gemeinsam mit
            unseren Kunden einen Unterschied zu machen und die Natur für
            zukünftige Generationen zu bewahren.
          </p>
  
          <div className="flex  items-center pt-16">
            <div className="flex flex-row flex-wrap justify-center">
              {developers.map((developer) => (
                <div className="w-52 mx-4 mb-6" key={developer.name}>
                  <p className="text-green-600 dark:text-green-500 text-2xl  text-center">
                    {developer.name}
                  </p>
                  <p className="text-gray-500  dark:text-gray-400  font-light text-center">
                    {developer.cite}
                  </p>
                  <img
                    className="bg-contain  w-full   border border-gray-600 mt-4 rounded-3xl"
                    src={developer.image}
                    alt={developer.role}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
    
   
}

export default AboutUs;

