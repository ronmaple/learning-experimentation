import React from "react"
// different imports from tutorial. @apollo/client/index.js already exports these
import { useQuery, gql } from "@apollo/client"

import { Grid } from "semantic-ui-react"

import PostCard from "../components/PostCard"

function Home() {
  // My own notes: This tends to crash when manually refreshed.
  // probably because it's not cached after load.
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS_QUERY)

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
