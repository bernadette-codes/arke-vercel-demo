
export default (req, res) => {
  res.statusCode = 200
  res.json({ message: process.env.API_KEY })
}
