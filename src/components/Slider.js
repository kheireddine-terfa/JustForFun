function Slider() {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item c-item1 active">
          <div className="shape-overlay"></div>
          <div className="carousel-caption">
            <h5>Explore the World of Succulents</h5>
            <p>
              Bring home low-maintenance beauty with our wide range of
              succulents and cacti.
            </p>
          </div>
        </div>
        <div className="carousel-item c-item2">
          <div className="shape-overlay"></div>
          <div className="carousel-caption">
            <h5>Nature’s Air Purifiers</h5>
            <p>
              Discover plants that cleanse the air and add a touch of green to
              your space.
            </p>
          </div>
        </div>
        <div className="carousel-item c-item3">
          <div className="shape-overlay"></div>
          <div className="carousel-caption">
            <h5>Unique Pots for Unique Plants</h5>
            <p>
              Shop our exclusive collection of pots that perfectly complement
              your plants.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Slider
