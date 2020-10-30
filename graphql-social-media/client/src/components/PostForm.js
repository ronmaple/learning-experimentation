import React from "react"
import { Button, Form } from "semantic-ui-react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { useForm } from "../utils/hooks"
import { FETCH_POSTS_QUERY } from "../utils/graphql"

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    // update based on cached data -- performing GraphQL queries on client data --
    // "Direct Cache Access"
    // this will update the posts UI (UI is based on cached data -- this updates cache, which updates UI?)
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })
      data.getPosts = [result.data.createPost, ...data.getPosts]
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
      values.body = ""
    },
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`
export default PostForm
