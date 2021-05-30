const BlogForm = (props) => (
    <form onSubmit={props.submitBlog}>
      <div>
        title:
        <input
          value={props.title}
          onChange={props.titleHandler}
        />
      </div>
      <div>
        author:
        <input
          value={props.author}
          onChange={props.authorHandler}
        />
      </div>
      <div>
        url:
        <input
          value={props.url}
          onChange={props.urlHandler}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
  
  export default BlogForm;
  