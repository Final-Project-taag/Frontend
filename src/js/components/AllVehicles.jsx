
// import {useState,useEffect} from 'react';
// import axios from 'axios';
// import Card from './Card';




// function CardGrid() {
//  const [cars, setCars] = useState([])

// useEffect(()=> {
//  try {
//     fetchCars();
//     console.log(cars);
//  } catch (error) {
//     console.log(error);
//  }


// },[])

// async function fetchCars(){

//     const token = localStorage.getItem("token")
  
//     const resp = await axios.get("http://localhost:8081/vehicles")

   
//     console.log(resp)
//         setCars(resp.data)
// }

//     return (
//         <div className="grid grid-cols-3 gap-4">
//             {cars.map((car) => (
//                 <div key={car._id} className="col-span-1">
//                     <Card car={car} />
//                      {/* <div>
//                    <button className="btn1 mr-2" > <Link to={`/booking/${car._id}`}>RESERVIERUNG</Link>  </button>
//                     </div>  */}
//                 </div>
                
//             ))}
//         </div>
//     );
// }

// export default CardGrid;