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
    <div className=" flex  h-full flex-col container mx-auto top-24 pb-28  about-us-container">
      <div className="flex flex-col text-center bg-white bg-opacity-90  ">
        <h1 className="text-green-600 text-6xl p-6   ">
          Green <span className=" text-gray-600">Wheels</span> Team{" "}
        </h1>
        <p className="font-sans text-xl text-center mx-10">
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
              <div className="w-56 mx-4 mb-6" key={developer.name}>
                <p className="text-green-600 text-xl  text-center">
                  {developer.name}
                </p>
                <p className="text-gray-500  font-light text-center">
                  {developer.cite}
                </p>
                <img
                  className="bg-contain  w-full  border-solid border border-gray-300 mt-4 rounded-3xl"
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
