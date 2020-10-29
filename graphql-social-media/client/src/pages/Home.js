import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Grid } from "semantic-ui-react"

import PostCard from "../components/PostCard"

function Home() {
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
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

// The syntax is slightly different on this version? { getPosts ... } with no "query" passed
// is a syntax error
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`
export default Home
