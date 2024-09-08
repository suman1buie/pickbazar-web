import { useEffect, useState } from "react";
import "../css/Home.css";
import { LuSearch } from "react-icons/lu";
import Card from "../components/Card";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";

export const Home = () => {
  const [focus, setFocus] = useState(false);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  const [images, setImages] = useState<Array<string>>([]);

  const getRandomImage = (num: number) => {
    let image: string = `https://picsum.photos/700/700?random=${num}`;
    return image;
  };

  useEffect(() => {
    let newImages: Array<string> = new Array<string>();
    for (let i = 1; i < 25; i++) {
      let img = getRandomImage(i);
      newImages.push(img);
    }
    setImages(newImages);
  }, []);

  return (
    <div className="home-wrapper">
      <div className="inner-wrapper">
        <input
          type="text"
          placeholder="Search any post with title"
          className="input-text-style"
          style={focus ? { border: "1px solid red" } : { border: "none" }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
        <button className="search-btn">
          <LuSearch />
          <span>Search</span>
        </button>
      </div>
      <div className="home-content">
        {images.length > 0 && images.map((image) => <Card image={image} />)}
      </div>
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
        align="end"
      />
    </div>
  );
};
