# YoPhrase

Lorem ipsum dolor **sit** amet, *consectetur* adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Development Environment

http://dev.yophrase.com

## Node Services

### Photos

`GET | PUT | DELETE` /services/photos/photo/{id}

- Single photo operation

`GET` /services/photos/user/{id||"me"}

- Photos uploaded by a user
- If "me" is provided instead of ID, ID is looked up.
  - access_token is required

### Comments

`GET | POST | PUT | DELETE` /services/comments/comment/{id}

- Single comment operation

`GET` /services/comments/photo/{id}

- Comments tied to a photo
