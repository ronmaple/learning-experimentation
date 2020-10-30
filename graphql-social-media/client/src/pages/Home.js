import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import { Grid, Transition } from "semantic-ui-react"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"
import { FETCH_POSTS_QUERY } from "../utils/graphql"

function Home() {
  const { user } = useContext(AuthContext)
  // My own notes: This tends to crash when manually refreshed.
  // probably because it's not cached after load.
  const {
    loading,
    error,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS_QUERY)

  // no error handling throws an async fetch-type error and crashes to the page (unknown root)
  if (error) {
    return <h1>Error</h1>
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home
