import Slider from '../components/Slider'
import NewsLetter from '../components/NewsLetter'
import Plants from '../components/Plants'
import { myPlants } from '../constants/plants'
function Home() {
  return (
    <>
      <Slider></Slider>
      <Plants plants={myPlants}></Plants>
      <NewsLetter></NewsLetter>
    </>
  )
}
export default Home
