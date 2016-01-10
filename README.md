# YoPhrase

Lorem ipsum dolor **sit** amet, *consectetur* adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Development Environment

http://dev.yophrase.com

## Node Services

### Photos

`GET | PUT | DELETE` /services/photos/photo/{id}

- Single photo operation

`GET` /services/photos/user/{id || "me"}?access_token=1234

- Photos uploaded by a user
- If "me" is provided as an ID, ID is looked up.
  - access_token is required

### Comments
`GET` /services/comments/{image-id}

- Get comments tied to a image

`POST` /services/comments/{image-id}

{"comment":"hello,comment!"}

- Posts a comment to an image

`POST` /services/comments/{comment-id}/like

{"value":"1 || 0"}

- Likes or unlikes a comment

`DELETE` /services/comments/{comment-id}?access_token=1234

- Deletes a comment


