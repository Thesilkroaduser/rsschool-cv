/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react"
import WeatherSection from "./components/weather"
import LocationSection from "./components/location"
import Bg from "./components/background"

const App = () => {
  async function getLinkToImage() {
    const url =
      "https://api.unsplash.com/photos/random?collections=57475813&client_id=4IltOePWMoqy_YsKGjntshdtDHBPpYjI55gqWkLi3E0"
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.urls.regular)
  }
  getLinkToImage()
  const src = "https://source.unsplash.com/user/user123321999/likes/1920x1080"
  const src1 = "https://source.unsplash.com/user/user123321999/likes/1920x1079"
  const [bg1, setBg1] = useState(src)
  useEffect(() => {
    const changerBg = document.querySelector(".change")
    changerBg.addEventListener("click", () => {
      const bgs = document.querySelectorAll(".bg")
      bgs.forEach((elt) => {
        elt.classList.toggle("hidden")
      })
      setBg1("https://source.unsplash.com/user/user123321999/likes/1920x1080")
    })
  })
  return (
    <div className="wrapper">
      <Bg className="bg" src={bg1} />
      <Bg className="bg hidden" src={src1} />
      <WeatherSection />
      <LocationSection />
    </div>
  )
}
export default App
