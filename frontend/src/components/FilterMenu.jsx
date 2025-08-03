import React, { useState } from "react";

const FilterMenu = ({allVideos,selectCategory}) => {
  const categories = ["All","Bhajan", "Education", "Exercise"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  function handleCategory(category){
      setSelectedCategory(category)
      if(category == "All"){
        return allVideos();
      }else{
        return selectCategory(category);
      }
  }
  return (
    <div className="flex w-fit space-x-3  px-4 py-2 ">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategory(category)}
          className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition 
            ${
              selectedCategory === category
                ? "bg-white text-black shadow"
                : "bg-gray-300 text-gray-800"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
