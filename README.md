MAIN GALLERY

> A stress tested, and scaled to 10mil active users while maintaining [metric] response time

## Related Projects

  - https://github.com/the-nine9/Blakes-proxy

## CRUD operations
#  - GET -> URL: localhost/gallery/100/homes
      query: req.params.id
      success response: JSON OBJ of listing with id 100]
#  - POST -> URL: localhost/gallery/101/homes
      query: req.params.id
      update: (JSON OBJ) request body
      success response: JSON OBJ of added data
#  - PUT -> URL: localhost/gallery/101/homes
      query: req.params.id
      update: (JSON OBJ) request body
      success response: String 'success'
#  - DELETE -> URL: localhost/gallery/101/homes
      query: req.params.id
      update: (JSON OBJ) request body
      success response: String 'success'


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

