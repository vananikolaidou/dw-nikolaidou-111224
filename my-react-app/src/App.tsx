import { useEffect, useState } from 'react';

// POSTS API
// https://jsonplaceholder.typicode.com/posts

interface Post {
  id: string
  title: string
  body: string
}

interface PostCardProps {
  post: Post
}

function PostCard({post}: PostCardProps) {

  const postBody = 
    post.body.length > 200 ? 
      post.body.substring(0,200) + "..." :
      post.body;
     
  return <div style={{ display: 'flex', flexDirection: 'column'}}>
    {/*TODO: Add an image here 200x200 by keeping to enhance card just UI -> "https://picsum.photos/200/300" */}
    <img src={"https://picsum.photos/200/300"} alt="img" style={{width: "200px", height: "200px", objectFit: "cover"}}/>
    <div>
    {/* TODO: Add Post Title */}
    {post.title}
    </div>
    <div>
      {/* TODO: Add Post body with 200 chars max and add ... at the end */}
      {postBody}
    </div>
  </div>
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState("");

  // TODO: Fetch Posts

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
      const postData = await postResponse.json();
      setPosts(postData);
    }
    catch (error) {
      console.log("error", error);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // TODO: Filter posts by post title based on the given query
  const filterByTitle = posts.filter((post) => 
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className='App'>
      {/*  TODO: Implement query controller */}
      <input placeholder="Search post" 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* TODO: Render the PostCard for each post */}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : 
        (filterByTitle.map((post) => <PostCard key={post.id} post={post}/>))
        }
      </div>

    </div>
  );
}