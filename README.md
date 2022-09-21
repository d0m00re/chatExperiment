# chatExperiment
experiment socket scaling and architecture

# done
* basic train on uwebsocket
* v0.001 : make basic chat and store history inside server
# current work
* v0.002 : front : migrate to compund pattern
* v0.003 : manage multyple room / and keep history 

* v0.00x add register/login management
* v0.00x migrate to microservice
* v0.00x authrorization system :
    -> room owner
    ->
* v0.00x : abstract object management from server
    -> allow to sotre unstructured data like notation, form and other things
    -> advanced link inside unstructured object
    -> advanced link between unstructure element
* v0.00x : add a database
* v0.00x : use dal for database management
# goal

## server
* manage room list
* manage user list
* manage auth
* database abstraction - hexgonale architecture

## CLIENT
* expiriment compound components


## USER CONNEXION
CLIENT                SERVER
0)
authentification      validation, send back token
store token

1) populate data
CLIENT                SERVER
user get list
of this room
and data (or separate)
                        return roomList          


### Ladle
like storybook but with better performance - tech test
npm run ladle