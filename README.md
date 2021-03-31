# Docker 101

Learn Docker by building simple demo app.

## Exercise 1 - Setup and dockerize a Node.js app

* Checkout this repo
* Use `docker build` command to build a new image
* Use `docker run` command to run the echo server service in host environment

## Exercise 2 - Use Docker Volumns to share data across multiple containers

A volumn is a dedicated folder on the host machine, inside the folder, a container can read/write files.

* Create a volumn using `docker volumn create shared-stuff` to create a new volumn
* Add `--mount source=shared-stuff,target=/stuff` to `docker run` command to mount the *source* volumn to the *target* in the running container

## Exercise 3 - Use docker-compose to manage multile services

> Tip: 1 PROCESS PER CONTAINER

To keep your container healthy, write simple, maintainable microservices.

## Exercise 4 - Use nginx for multiple Node.js apps


## Resources

* [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
* [Learn Docker in 7 Easy Steps - Full Beginner's Tutorial](https://www.youtube.com/watch?v=gAkwW2tuIqE)
