# Docker 101

Learn Docker by building simple demo app.

## Exercise 1 - Setup and dockerize a Node.js app

1. Checkout this repo
2. Use `docker build` command to build a new image
3. Use `docker run` command to run the echo server service in host environment

## Exercise 2 - Use Docker Volumns to share data across multiple containers

A volumn is a dedicated folder on the host machine, inside the folder, a container can read/write files.

1. Create a volumn using `docker volumn create shared-stuff` to create a new volumn
2. Add `--mount source=shared-stuff,target=/stuff` to `docker run` command to mount the *source* volumn to the *target* in the running container

## Exercise 3 - Use nginx as reverse proxy for the Node.js app

> Tip: 1 PROCESS PER CONTAINER - To keep your container healthy, write simple, maintainable microservices.

1. Add nginx folder, containing `nginx.conf` (for nginx service configuration) and `Dockerfile` (for building the nginx image)
2. Use `docker-compose.yml` file to describe how to run two services and make the two communicate with each other

## Resources

* [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
* [Learn Docker in 7 Easy Steps - Full Beginner's Tutorial](https://www.youtube.com/watch?v=gAkwW2tuIqE)
* [NGINX with Docker and Node.js — a Beginner’s guide | by Ashwin | Medium](https://ashwin9798.medium.com/nginx-with-docker-and-node-js-a-beginners-guide-434fe1216b6b)

## Cheatsheet

* [Dockerfile cheatsheet](https://devhints.io/dockerfile)
* [Docker CLI cheatsheet](https://devhints.io/docker)
* [docker-compose cheatsheet](https://devhints.io/)
