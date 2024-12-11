import axios from "axios";
import courses from '../models/courses/courses';
import Card from "./Card";
import Banner from "./Banner";
import SearchBar from "@/Components/SearchBar"

async function fetchData() {
    const response = await axios.get("http://localhost:3000/api/courses");

return response.data
    
}



export default async function Landinpage(){
    const data = await fetchData()
    const courses = data.courses ||[]

    return(
        <div>
            <Banner/>
            <SearchBar/>  
            <h1 className="font-bold text-3xl text-center py-8">All courses</h1>
          <div  className="grid grid-cols-2 mx-20">
              {
                courses.map((data)=><Card key={data._id} title={data.title} description={data.description} duration={data.duration} instructor={data.instructor}/>)
              }
          </div>
        </div>
    )
} 

