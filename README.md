# ELO Ranking System API 
## REST API WITH NESTJS (CRUD API)

=> npm install to install -*node modules

=> npx prisma init (init prisma directory)
=> npx prisma studio
=> npx prisma generate 
=> npx prisma migrate dev
=> npx prisma migrate deploy

## 1_building the auth module/controller/provider
## 2_setting up a database  
    => docker compose up dev-db -d (set up postgres)
    => use prisma (result in a db module that you can use in typescript)
    => prisma migration
    => creating typescript types for the schema
## 3_prisma module
    =>dependency injection
## 4_Using DTOs
    => use it for validation
    => use classes for DTOs:
        - Classes are part of JS (preserved as real entities in the compiled JavaScript)
        - interfaces are removed during the transpilation, Nest can't refer to them at runtime. This is important because features such as Pipes enable additional possibilities when they have access to the metatype of the variable at runtime
## 5_Using Class Validators
    => Pipes
    => install class validators
    => in Auth: generate a hash based on the password (using argon2)
    => prisma relations
    => Async functions
    => try catch Prisma/NestJs errors
## 6_SignIn/SignUp Logic (Basic Authentication)
    => hashing of the password, working with dtos
## 7_Automating NPM Scripts
    => Applying changes to package.json Script field
    => Rebuilding container and applying migration to the db
## 8_keeping track of the user (Sessions/JWT)
    => Authentication and Authorization
    => nestjs modules (config module)
    => auth folder

    