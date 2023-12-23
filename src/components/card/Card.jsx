
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
const Card = ({ key, item }) => {
  

  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <p style={{display: 'flex'}}>
        <FaEye size={20}/> <h4 style={{paddingLeft: "5px"}}>
       {item.views}</h4>

        </p>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
{/* {console.log("premium :", item.premium)} */}
          {/* <h3>{item.premium === true ? "Premium" : "Normal"}</h3> */}
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,60) }}/>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
