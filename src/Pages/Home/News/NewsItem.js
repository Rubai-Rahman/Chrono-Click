import React from "react";
import { Link,} from "react-router-dom";

const NewsItem = ({ item }) => {
  const { _id, name, details, img } = item;

  const url = `/news/${_id}`;

  return (
    <div>
      <div className="news-card-top card-top">
        <img src={img} alt="img" />
        <h1 k>{name}</h1>
      </div>
      <div className="news-card-bottom card-bottom">
        <p className="details">{details}</p>
        <Link
          to={url}
          style={{ color: "silver", fontSize: 15, letterSpacing: 3 }}
        >
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
