import axios from "axios"
import react, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import VideoCard from "../components/VideoCard";
import FilterMenu from "../components/FilterMenu";
import { useDispatch, useSelector } from "react-redux";
import { videoListMethod } from "../State/Slice/VideoList";

export default function Welcome() {
   
    const videos = useSelector(state=>state.VideoList)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        getVideos()
    },[])
    async function getVideos() {
        try {
            const token = localStorage.getItem('token')
            const videos = await axios.get(`http://localhost:3000/api/video`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
           
            console.log(videos)
            dispatch(videoListMethod(videos.data))
           
        } catch (error) {
            navigate('/login')
            console.log(error.message)
        }
    }
   
   async function selectCategory(category){
     const token = localStorage.getItem('token')
       const res = await axios.get(`http://localhost:3000/api/video/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

           dispatch(videoListMethod(res.data))
        

   }

    return (
        <div className=" w-full h-[97vh] overflow-auto flex items-center flex-col">
        <FilterMenu allVideos={getVideos} selectCategory={selectCategory}/>
        <section className="flex relative top-3.5 flex-wrap md:grid  md:grid-cols-3 gap-5  w-full ">
              {videos.map(video=><VideoCard key={video._id} video={video} />)}       
        </section>
        </div>
    )
}