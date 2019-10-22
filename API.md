# CIBORG API documentation

The base part of the URI path for the bundles API is `/api`

The following sections describe each API endpoint.

## Obtain most popular games

- Request:
  - Method: GET
  - Path: /games/top
  -  Body: none
- Response:
  - Success:
    - Status code: 200 OK 
    - Content-Type: aplication/json
    - Body example:

    ```json
      {
        "games": [
          {
            "id": 1,
            "name": "game1",
            "description": "description of game 1"
          },
          {
            "id": 2,
            "name": "game2",
            "description": "description of game 2"
          },
          ...
        ]
      }
    ```


---

## Obtain a specific game

- Request:
  - Method:GET
  - Path: /games/:name
    - Path parameters:
      - name - game name
  - Body: none
- Response:
  - Success: 
    - Status code: 200 OK 
    - Content-Type: application/json
    - Body:
 
    ```json
        {
          "id": 1,
          "name": "game1",
          "description": "description of game 1"
          "games": [  
            {
              ...
            }
          ]
        }
    ```

 - Errors:
   - Status Code: 404 Not Found

     - Body:
     ```json
       {
         "error": "Resource not found" ,
         "uri": "/games/game1"
       }
     ```

---


## Obtain all groups

- Request:
  - Method: GET
  - Path: /groups
  -  Body: none
- Response:
  - Success:
    - Status code: 200 OK 
    - Content-Type: aplication/json
    - Body example:

    ```json
      {
        "groups": [
          {
            "id": 1,
            "name": "group1",
            "description": "description of group 1"
          },
          {
            "id": 2,
            "name": "group2",
            "description": "description of group 2"
          },
          ...
        ]
      }
    ```


---

## Obtain a specific group

- Request:
  - Method:GET
  - Path: /groups/:id
    - Path parameters:
      - id - group identifier
  - Body: none
- Response:
  - Success: 
    - Status code: 200 OK 
    - Content-Type: application/json
    - Body:
 
    ```json
        {
          "id": 1,
          "name": "group1",
          "description": "description of group 1",
          "games": [  
            {
              ...
            }
          ]
        }
    ```

 - Errors:
   - Status Code: 404 Not Found

     - Body:
     ```json
       {
         "error": "Resource not found" ,
         "uri": "/groups/1"
       }
     ```


---

## Create a Group

- Request:
  - Method:POST
  - Path: /groups
  - Content-Type: application/json
  - Body:

```json
  {
    "name": "group1",
    "description": "description of group 1"
  }  
```

- Response:
  - Success:
    - Status code: 201 Created
    - Headers:
      - Location: /groups/1
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "Group created",
        "uri": "/groups/1"
      }
    ```
 - Errors:
   - Status Code: 400 Bad Request

   - Body:

     ```json
        {
          "error": "Bad request",
          "errorDetail": "Parameter x error"
          "uri": "/groups/1"
        }
     ```
---

## Update a Group

- Request:
  - Method: PUT
  - Path: /groups/:id
    - Path parameters:
      - id - group id
  - Content-Type: application/json
  - Body:

```json
  {
    "name": "group1",
    "description": "description of group 1"
  },  

```

- Response:
  - Success:
    - Status code: 200 OK
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "Group updated" ,
        "uri": "/groups/1 "
      }
    ```

- Errors:
  - Status Code: 400 Bad Request

   - Body:

     ```json
        {
          "error": "Bad request",
          "errorDetail": "Parameter x error"
          "uri": "/groups/1"
        }
     ```
  - Status Code: 404 Not Found

     - Body:
     ```json
       {
         "error": "Resource not found" ,
         "uri": "/groups/2"
       }
     ```

---


## Add a game to a group

- Request:
  - Method: PUT
  - Path: /groups/:groupId/games/:gameId
    - Path parameters:
      - groupId - group id
      - gameId - game id
  - Content-Type: application/json
  - Body: none

- Response:
  - Success:
    - Status code: 200 OK
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "Group updated" ,
        "uri": "/groups/1/games/1 "
      }
    ```

- Errors:
  - Status Code: 400 Bad Request

   - Body:

     ```json
        {
          "error": "Bad request",
          "errorDetail": "Parameter x error",
          "uri": "/groups/1/games/1"
        }
     ```
  - Status Code: 404 Not Found

     - Body:
     ```json
       {
         "error": "Resource not found" ,
         "uri": "/groups/1/games/1"
       }
     ```
---


## Delete a game from a group

- Request:
  - Method:DELETE 
  - Path: /groups/:groupId/games/:gameId
    - Path parameters:
      - groupId - group identifier 
      - gameId - game identifier 
  - Content-Type: 
  - Body: none

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "Game removed",
        "uri": "/groups/1/games/1"
      }
    ```

- Errors:
  - Status Code: 404 Not Found

     - Body:
     ```json
       {
         "error": "Resource not found" ,
         "uri": "/groups/1/games/1"
       }
     ```
  
---

## Get games from group that have an determined interval duration

- Request:
  - Method: GET
  - Path: /groups/:groupId/games/:min&:max
    - Path parameters:
      - groupId - group id
      - min - minimum duration
      - max - maximum duration
  - Content-Type: 
  - Body: none

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "games":[
          {
            "name":"game1",
            "min_playtime":"45",
            "max_playtime":"90",
            "description":"Description of game 1"
          }
          {
            "name":"game2",
            "min_playtime":"45",
            "max_playtime":"90",
            "description":"Description of game 2"
          }
        ]
      }
    ```

- Errors

  - Status Code: 404 Not Found

    - Body:
     ```json
       {
         "error": "Resource not found" ,
         "uri": "/groups/1"
       }
     ```
---


