const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const total = likes.reduce((acc, curr) => acc + curr)
  return total
}

const favoriteBlog = (blogs) => {
  const ret = blogs.reduce((fav, curr) => (curr.likes > fav.likes ? curr : fav))
  return ret
}

const mostBlogs = (arr) => {
  const authors = arr.map(b => [
    b.author,
    arr.filter(a => a.author === b.author).length
  ])
  const ret = authors.reduce((most, curr) => (curr[1] > most[1] ? curr : most))
  return {
    author: ret[0],
    blogs: ret[1]
  }
}

const mostLikes = (arr) => {
  const authors = arr.map(b => [
    b.author,
    arr.filter(a => a.author === b.author).reduce((acc, curr) => (acc + curr.likes))
  ])
  const ret = authors.reduce((most, curr) => (curr[1] > most[1] ? curr : most))
  return {
    author: ret[0],
    likes: ret[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}