# Refuge Library Computer Access/Retrieval System

(RS-LCARS)

[![Build Status](https://travis-ci.org/RefugeSystems/lcars-library-node.png)](https://travis-ci.org/RefugeSystems/lcars-library-node)
[![Dependency Status](https://david-dm.org/RefugeSystems/lcars-library-node.svg)](https://david-dm.org/RefugeSystems/lcars-library-node)

This project is a graph based storage system designed to offer information in a variety of ways to drive relational inquiries to data.

Other projects for Refuge System are being built around this system to provide interfaces into the data, such as a Star Trek style dashboard familiar to the NExt Generation designs for this project's namesake and monitoring systems to use the event propagation modeling within this project.


## Storage

`TODO:` The goal is for storage to be abstracted to leverage any database for the metadata used by the library. For now the library sits on MongoDB for simplicity.

### Indexing External Data

`TODO:` Another goal is to be able to point the library at a database and have it act as second interface to that data for queries, events, and general health while leaving the other database to fulfill its usual duties such as providing data to a service.

## Connections

`TODO:` Sockets & WebSockets are used to maintain connections between the library, other libraries in its domain, and connected clients.

### Connected Libraries

`TODO:` For related queries and event propagation. 

## Events

`TODO:` The library keeps a store of events that the system has seen sourced from Clients or internally detected events. These events can flag resources to push an event affecting that resource that then follows described event propagation to update connected nodes.


# Testing

## Specifications

These are the unit tests for the system to ensure that each "part" is fulfilling its specifications. This is typically described directly in the YuiDocs for the piece being tested and the functions underneath it.

## Scenarios

These are essentially the use cases for the system and generally involve the system coming online with basic shims in place to remove the need for things like databases while the tests run to ensure the same data is being returned and to avoid false failures due problems not within the code, such as connectivity problems.
 