let URI;
if (process.env.NODE_ENV === "production") {
  // for production
  URI = "https://powerful-brushlands-97812.herokuapp.com/";
} else {
  //for devlopment mode;
  URI = "http://localhost:5000";
}
export default URI;
