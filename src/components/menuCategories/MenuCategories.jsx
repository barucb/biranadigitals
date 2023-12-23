import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";





const MenuCategories = async () => {
try {
  const res = await fetch("http://localhost:3000/api/categories")
  if (!res.ok) {
    throw new Error("failed")
  }
  
  const data = await res.json()
  
  
  return (
      <div className={styles.categoryList}>
    {data?.map((item) => (
      
      <Link
      href={`/blog?cat=${item.title}`}
      className={`${styles.categoryItem} ${styles.style}`}
      >
        {item.title}
      </Link>
      
      ))}
      </div>
  );
} catch (error) {
  console.error("Error fetching categories", error)
  return <div>Error Fetching Categories. Please reload the page</div>
}
};

export default MenuCategories;
