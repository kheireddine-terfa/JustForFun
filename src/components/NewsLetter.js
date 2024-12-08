function NewsLetter() {
  return (
    <div className="jumbotron jumbotron-fluid text-white text-center py-5 position-relative">
      <div className="bg-left"></div>
      <div className="bg-right"></div>
      <div className="container position-relative z-index-1">
        <h1 className="display-4">Join Our Green Community</h1>
        <p className="lead">
          Sign up to get exclusive offers, tips, and the latest news on our
          products.
        </p>
        <hr className="my-4" />
        <p>
          Stay updated with the best ways to care for your plants and receive
          notifications on new arrivals!
        </p>
        <a className="btn btn-light btn-lg" href="/#" role="button">
          Sign Up Now
        </a>
      </div>
    </div>
  )
}
export default NewsLetter
