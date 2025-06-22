import React, { useState } from "react";
import FoodSkeleton from "./FoodSkeleton";
// import { AddToCart } from ""
// import addToCartIcon from "./assets/images/icon-add-to-cart.svg";

export default function Food({ 
  data, 
  cartNumber, 
  setCartNumber, 
  setSelectedFood, 
  selectedFood,
  isLoading = false 
}) {
  const [quantity, setQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Show skeleton if data is loading
  if (isLoading || !data) {
    return <FoodSkeleton />;
  }

  return (
    <div className="relative w-fit">
      {!imageLoaded && <FoodSkeleton />}
      
      <div className={imageLoaded ? "block" : "hidden"}>
        <picture>
          <source srcSet={data?.image.desktop} media="(min-width:1024px)" />
          <source srcSet={data?.image.tablet} media="(min-width:640px)" />
          <img
            className={
              data.quantity > 0
                ? "food-img rounded-lg border-2 border-my-red mx-auto md:w-[90%]"
                : "food-img rounded-lg md:w-[90%] mx-auto"
            }
            src={data?.image.mobile}
            alt="food-image"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </picture>
        
        <button
          id="add-to-cart-btn"
          onClick={function () {
            if (typeof data.quantity === "undefined") {
              data.quantity = 0;
            }
            setQuantity(data?.quantity + 1);
            setCartNumber(cartNumber + 1);
            data.quantity++;
            if (!selectedFood.includes(data)) {
              setSelectedFood([...selectedFood, data]);
            }
          }}
          className={
            data.quantity > 0
              ? "hidden"
              : `add-btn w-[60%] md:w-[70%] lg:w-[60%] absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-rose-50 flex
           items-center justify-center gap-2 border-my-rose-500 border-[1px] rounded-full py-3 px-4 text-sm font-bold 
           hover:cursor-pointer hover:text-my-red hover:border-my-red`
          }
        >
          <img src="./images/icon-add-to-cart.svg" alt="Add to cart" className="inline-block w-5 h-5" />
          Add to Cart
        </button>
        
        {data.quantity > 0 && (
          <div
            className="absolute flex w-[60%] md:w-[70%] lg:w-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-red
           items-center justify-center gap-12 border-my-red border-1 rounded-full py-3 px-4 text-sm font-bold 
           hover:cursor-pointer hover:border-my-red"
          >
            <button
              id="decrease-btn"
              onClick={() => {
                setQuantity(quantity - 1);
                setCartNumber(cartNumber - 1);
                data.quantity = quantity - 1
                if (quantity - 1 <= 0) {
                  setQuantity(0);
                  setSelectedFood(selectedFood.filter(item => item !== data));
                }
              }}
              className="border-2 border-my-rose-50 h-6 w-6 rounded-full flex items-center hover:cursor-pointer justify-center
              hover:text-my-red hover:bg-my-rose-50 group text-my-rose-50 transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="currentColor"
                viewBox="0 0 10 2"
              >
                <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <span className="quantity text-my-rose-50">{data.quantity}</span>
            <button
              id="increase-btn"
              onClick={() => {
                setQuantity(quantity + 1);
                setCartNumber(cartNumber + 1);
                data.quantity = quantity + 1
              }}
              className="border-2 border-my-rose-50 h-6 w-6 rounded-full flex items-center hover:cursor-pointer justify-center
              hover:text-my-red hover:bg-my-rose-50 group text-my-rose-50 transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                viewBox="0 0 10 10"
              >
                <path
                  fill="currentColor"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        )}
        
        <div className="mt-8 flex flex-col details-div lg:pl-4">
          <p className="text-my-rose-300 text-sm">{data?.category}</p>
          <p className="text-sm text-black font-semibold">{data?.name}</p>
          <p className="font-semibold text-my-red text-sm">
            ${data?.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}