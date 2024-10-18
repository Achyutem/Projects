import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Stars = () => {
  const [hover, setHover] = useState<number | null>(null);
  const onEnter = (index : number | null) => {
    setHover(index);
  };
  const onExit = () => {
    setHover(null);
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="Stars">
      {stars.map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={hover !== null && index <= hover ? solidStar : regularStar}
          onMouseEnter={() => onEnter(index)}
          onMouseLeave={onExit}
        />
      ))}
    </div>
  );
}


export default Stars