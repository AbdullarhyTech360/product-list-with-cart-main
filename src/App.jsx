import React, { useEffect, useState } from "react";
import Food from "./Food";
const cartIllustration = "./images/illustration-empty-cart.svg";
import FoodSkeleton from "./FoodSkeleton";

function App() {
  const [foods, setFoods] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [selectedFood, setSelectedFood] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      });
    // setTimeout(() => {
    //   // Use relative path that respects vite base config
    // }, 3000);
  }, []);


  return (
    <>
      <div className={
        foods.length > 0 ? "mt-10 lg:w-fit mx-auto flex flex-col items-center justify-center"
          : "mt-10 mx-auto w-full max-w-[1500px]"
      }>
        <div className="">
          <h1 className="text-black font-bold text-3xl mb-6 pl-4 lg:pl-7">Desserts</h1>
          <div className="p-4 flex flex-col md:flex-row gap-5 md:gap-0 lg:gap-6">
            <div className={
              foods.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 md:gap-x-0 lg:gap-x-5"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mr-6 w-full"
            }>
              {foods.length > 0 ? (
                foods.map((food, index) => (
                  <Food
                    key={index}
                    data={food}
                    cartNumber={cartNumber}
                    setCartNumber={setCartNumber}
                    setSelectedFood={setSelectedFood}
                    selectedFood={selectedFood}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                ))
              ) : (
                Array.from({ length: 9 }).map((_, index) => (
                  <FoodSkeleton key={index} />
                ))
              )}
            </div>
            <div className={
              cartNumber <= 0
                ? "bg-my-rose-50 p-4 rounded-lg md:w-1/3 h-[275px] overflow-y-auto transition-all duration-300 ease-in-out min-h-[275px] md:-mt-15"
                : "bg-my-rose-50 p-4 rounded-lg md:w-1/3 h-fit min-h-[275px] overflow-y-auto transition-all duration-300 ease-in-out"
            }>
              {cartNumber <= 0 && (
                <div className="">
                  <h1 className="text-my-red font-bold text-lg pointer-events-none">
                    Your Cart (<span>{cartNumber}</span>)
                  </h1>
                  <div className="mt-5 flex justify-center flex-col items-center">
                    <img
                      src={cartIllustration}
                      alt="Stylized empty shopping cart resting on a soft shadow, surrounded by a calm and neutral background, conveying a gentle and lighthearted mood. No text is present in the image."
                    />
                    <p className="text-sm font-bold text-my-rose-500 pointer-events-none">
                      Your added items will appear here
                    </p>
                  </div>
                </div>
              )}
              {cartNumber > 0 && (
                <div className="">
                  <h1 className="text-my-red font-bold text-2xl pointer-events-none tracking-wider font-sans">
                    Your Cart (<span>{cartNumber}</span>)
                  </h1>
                  <div>
                    {selectedFood.map((food, index) => (
                      <div
                        className="flex items-center justify-between w-full p-2 pl-0 mb-4 pb-4 border-my-rose-100 border-b"
                        key={index}
                      >
                        <div key={index} className="">
                          <p className="font-semibold">{food?.name}</p>
                          <p className="text-sm font-bold text-my-red">
                            {food.quantity}x{" "}
                            <span className="text-my-rose-300 font-semibold mx-4">
                              {" "}
                              @ ${food?.price.toFixed(2)}
                            </span>
                            <span className="text-my-rose-500">
                              ${(food?.quantity * food.price).toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <button
                          id="remove-item"
                          onClick={() => {
                            setSelectedFood(
                              selectedFood.filter((item) => item !== food)
                            );
                            setCartNumber(cartNumber - food.quantity);
                            food.quantity = 0;
                            setQuantity(0);
                          }}
                          className="text-my-rose-300 border-2 border-my-rose-300 rounded-full h-5 w-5 flex items-center justify-center hover:cursor-pointer
                        hover:text-my-rose-900 hover:border-my-rose-900"
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
                              d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-my-rose-500">
                        Order total
                      </p>
                      <p className="text-lg font-bold text-my-rose-900">
                        {"$" +
                          selectedFood
                            .reduce(
                              (acc, food) => acc + food.price * food.quantity,
                              0
                            )
                            .toFixed(2)}
                      </p>
                    </div>
                    <p className="flex items-center justify-center p-4 bg-my-rose-100 rounded-lg font-semibold text-my-rose-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        fill="none"
                        viewBox="0 0 21 20"
                      >
                        <path
                          fill="#1EA575"
                          d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
                        />
                        <path
                          fill="#1EA575"
                          d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
                        />
                      </svg>
                      <span className="text-sm text-center w-full block">
                        This is a{" "}
                        <span className="font-bold text-my-rose-900">
                          carbon-neutral
                        </span>{" "}
                        delivery
                      </span>
                    </p>
                    <button
                      id="confirm-order-btn"
                      onClick={() => setIsOrderConfirmed(true)
                      }
                      className="text-my-rose-50 bg-my-red font-bold hover:cursor-pointer text-sm rounded-full w-full py-3 mt-4 hover:bg-my-red/90 transition-colors tracking-wider"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              )}
              {
                isOrderConfirmed && (
                  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl">
                    <div className="h-fit my-3 p-6 sm:p-8 overflow-y-auto w-full max-w-lg max-h-[90vh]">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
                          fill="#1EA575"
                        />
                        <path
                          d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
                          fill="#1EA575"
                        />
                      </svg>
                      <h1 className="text-5xl w-1/2 font-bold my-2.5">Order Confirmed</h1>
                      <p className="font-semibold text-my-rose-300 mb-8">We hope you enjoy your food!</p>
                      <div className="bg-my-rose-50 rounded-xl p-2">
                        <div className="mt-7">
                          {selectedFood.map((food, index) => (
                            <div
                              className="flex items-center justify-between w-full p-2 pb-4 border-my-rose-100 border-b"
                              key={index}
                            >
                              <div key={index} className="flex items-center gap-4">
                                <img
                                  className="w-16 rounded-lg"
                                  src={food?.image.thumbnail} alt="thumbnail" />
                                <div className="h-15 flex flex-col justify-between">
                                  <p className="font-extrabold">{food?.name}</p>
                                  <p className="text-sm font-bold text-my-red">
                                    {food.quantity}x{" "}
                                    <span className="text-my-rose-300 font-semibold mx-4">
                                      {" "}
                                      @ ${food?.price.toFixed(2)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-my-rose-900">
                                ${(food?.quantity * food.price).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between mb-4  px-2 pt-7">
                            <p className="text-sm font-bold text-my-rose-500">
                              Order total
                            </p>
                            <p className="text-xl font-extrabold text-my-rose-900">
                              {"$" +
                                selectedFood
                                  .reduce(
                                    (acc, food) => acc + food.price * food.quantity,
                                    0
                                  )
                                  .toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          window.location.reload();
                        }}
                        className="text-my-rose-50 bg-my-red font-bold text-sm rounded-full w-full py-4 mt-8 hover:bg-my-red/90 transition-colors tracking-wider hover:cursor-pointer"
                      >
                        Start New Order
                      </button>
                    </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
