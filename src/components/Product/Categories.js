import React, { useContext } from "react";

const Categories = ({ categories, category, updateCategory }) => {
  const handleUpdateCategory = (index) => {
    updateCategory(index);
  };

  return (
    <ul className="list-unstyled">
      <h3>Categories</h3>
      {categories.map((myCategory, index) => (
        <li key={index} onClick={() => handleUpdateCategory(myCategory.Index)} className={myCategory.Index === category ? "active-category" : ""}>
          {myCategory.Name} 
        </li>
      ))}
    </ul>
  );
};

export default Categories;
