import React from "react";

const developers = [
  {
    name: "Gabriella",
    role: "aus Hannover",
    image: "/images/Gabriella.JPG",
  },
  {
    name: "Ahmad",
    role: "",
    image: "/images/avatar-place-holder.webp",
  },
  {
    name: "Ammar",
    role: "",
    image: "/images/avatar-place-holder.webp",
  },
  {
    name: "Tenaw",
    role: "",
    image: "/images/Tenaw.jpg",
  },
];

function AboutUs() {
  return (
    <div className="container mx-auto mt-16">
      <div className="text-center bg-black-500 mb-6">
        <h1 className="text-start text-xl font-bold ml-12"></h1>
        <h1 className="text-green-600 text-6xl p-4 font-medium mb-4">
        Green <span className=" text-gray-600">Wheels</span>  Team <br /> <br />
        
        </h1>
        <p className="font-sans text-center mx-10">
        Willkommen auf unserer Teamseite! Wir sind ein engagiertes Team von Entwicklern, die sich dafür einsetzen, die Umwelt zu schützen, indem wir moderne und ökologische Transportlösungen anbieten. Wir glauben, dass jeder seinen Teil dazu beitragen kann, die Natur zu erhalten und die Auswirkungen des Klimawandels zu verringern. Deshalb bieten wir unseren Kunden die neuesten Elektrofahrzeuge an, damit sie umweltfreundlicher unterwegs sein können. Unsere Mission ist es, eine nachhaltige Zukunft zu schaffen, indem wir den Übergang zu Elektrofahrzeugen erleichtern und den CO2-Fußabdruck verringern. Wir sind stolz darauf, unseren Kunden nicht nur eine umweltfreundliche Option zu bieten, sondern auch einen exzellenten Kundenservice und Unterstützung zu gewährleisten. Wir sind hier, um gemeinsam mit unseren Kunden einen Unterschied zu machen und die Natur für zukünftige Generationen zu bewahren.
        </p>
      </div>
      <div className="flex flex-col items-center p-4">
        
        <div className="flex flex-row flex-wrap justify-center">
          {developers.map((developer) => (
            <div className="w-56 mx-4 mb-6" key={developer.name}>
              <p className="text-green-800 text-center">{developer.name}</p>
              <p className="text-gray-500 text-center">{developer.role}</p>
              <img
                className="object-cover w-full h-56 border-solid border-4 border-gray-300 mt-4 rounded-full"
                src={developer.image}
                alt={developer.role}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;