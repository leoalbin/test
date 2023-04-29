# README

Welcome to Leo Albin's Test

**Video demos**:

[Video demo 1](https://www.loom.com/share/8eace1b4856b4ed880cc5005ee048c2d)

[Video demo 2](https://www.loom.com/share/46c275d0b6594f9a8708412b6875a6e5)

#
#

**Backend**:

I'm following Clean Architecture for the general architecture of the project. The main concept I'm applying here is to separate Domain, Application, and Infrastructure layers by using dependency injection and inversion of control implementing Adapters against interfaces. We are using the design patterns `Adapter`, and `Repository` to isolate the application layer from the infrastructure layer. We implement the application layer use cases using interfaces of repositories. Then we instantiate the use cases classes injection the actual implementation of those interfaces. For example, we have `IUserRepo` interface, where we define all the methods we need to get and save User instances. Then we implement a concretion of that interface using Prisma ORM in PrismaUserRepo. The repositories return always an instance of a domain object, for doing that we implement mappers, with methods "`toDomain`" and "`toPersistence`". We could also add "`toDTO`" in some cases.

As part of this separation of concerns in layers, we have all the core code in the folder "`core`" inside of `/api/src/core`. This folder contains all the domain code, nothing related with infrastructure or framework except the repos implementations and the use case controllers. These implementations should be changed if the project needs to be migrated to another framework.

We are applying the idea of not coupling to the framework, infrastructure or any implementation detail. the only thing is that the "core" folder is inside of `api` folder from `redwood` to avoid having to configure some building scripts, but I would move it to the root of the project.

For the code design and modeling, I'm using DDD. The project was simple enough to use an MVC pattern with CRUD services, but I wanted to use DDD just to demonstrate an understanding on these design patterns. I'm modeling the `User` and the `Excercises` as `Aggregate Roots.` Each of these Aggregates contains `Objects Values` like `UserName` or `ExerciseContent`.

The main idea I wanted to demonstrate here is the sense of collocating business rules inside of the domain layer where it corresponds. So, for example, you could not create an ExerciseContent with a length bigger than 100 characters. This is a business rule, and the one in charge of validating this is the Value Object `ExcerciseContent`. The second business rule provided on the specs was that a User could not have more than ten exercises. That made my thing the User as an Aggregate Root that should preserve some consistency in the number of exercises that could be created. So, I added `exercises` as a property of the instance `User` I'm modeling the user as "having" exercises. Then I created a method in the User class to add exercises, and this method will validate if the user has reached the limit or not before adding the exercise to the User. Another option here, that would make the design simpler, was to move that rule to the application layer, get all the exercises, count how many have the same userId, and prevent the creation of a new one, but it would be an anemic model with domain logic in the application logic. Also, having the addExercises inside of the User aggregate will allow to emit a domain event `ExcerciseAdded`, which could trigger different side effects in the system, like sending notifications, emails, etc.

The file structure is following DDD as well. Inside of "`core`" we have a shared folder with abstract classes that we use in all subdomains, and then the subdomains Exercises and Users. For the scope of the project would be fine to have only one subdomain, but if the project would be bigger, it seems like `User` and `Exercises` belong to different contexts. It's important to notice, that the file structure is not representing layers, we are collocating based on the use cases to simplify the code discoverability. You will find the controller (infra) and the use case (application) in the same folder, also the repos implementations are in the same folder as the interfaces.

The testing approach I'm taking is Acceptance testing in general. I'm writing tests to the use cases following the pattern `Given, When, Then.` I know if the application logic is working, the domain logic is also working. But also added unit testing for the Exercise class to show a case of unit testing.

The error handling is also separated into layers, there are use case errors, and domain errors are infrastructure errors. We are using a Result class to standardize domain error handling, and an Either monad to type the results of the use cases. For example, if an instance of an `ExerciseContent` could not be created because the content is longer than 100 it will return a `Result.fail()` but it will not throw an error, it will be passed to the application layer where we are going handle that failed domain result and if there is nothing else to do we are going to return a `Left` use case result, then the controller is the one that will translate this left result into a throw or a graphQL error or an HTTP code. The controller masks the errors as well to not give a lot of details to the front-end for security concerns.

On the database modeling I created the entities following the specs. I set a relation 1-n, one User many `Excercises` setting the `userId` prop in Exercise as a foreign key to the User’s id. We have two separate tables to normalize the data, will make no sense to store the same user in each Exercise row. We are setting constraints in the IDs of the User and the Exercise as primary keys.

Things I would like to add:

- Authentication and authorization to the controllers
- Pagination to the GetAllExercisesUseCase
- Add GetExercisesByUserId

**Front end**:

In the front end we are using React and some extra libraries from Redwood.js to handle routes and forms (is a wrapper to react-hook-forms).

The concepts I'm applying in the front end are:

**Atomic design**:

I'm implementing atoms for small indivisible parts of the design, like Title, ScrollArea, Text, etc

**Composition pattern**:

For example, I created a Sidebar component with a context, and building blocks, like "`Sidebar.Root`", "`Sidebar.Link`" etc. Here we are applying the Open Close principle, we could create different versions of the Sidebar without modifying existing/breaking instances.

**Feature collocation** file structure

We organize the project around features to improve the discoverability of the code-ba

**Single Responsibility**

We try to make the components as small and simple as possible. We prefer to use children composition than passing big amounts of properties to compose small building blocks into bigger structures. It also renders more efficiently.

**Higher Order Component**

To reuse the logic of rendering different components when the fetching is in different states (loading, success, error, empty) we created a HOC withQuery, that receives the Query and the different components as parameters.

**Testing**

I made basic testing to ensure any component throws an error, which covers 80% of the bugs related to a front-end component without having to implement expensive tests against implementation details.

**Styling**

I'm using utlity first approach through Tailwind as it is a faster way to prototype design coding when you don't have a design system. It's also super efficient on laoding performance.

**State management**

We did a simple state managment implementation in the SidebarProvider and sharing the state using the react context pattern.

**Design**

We try to apply some UI designing concepts like: readability, color contrast, consistent padding and margin, consistent color palette, size text contrast, key points of attention using color (logo, button)

We have used dark mode that is set automatically by the system preferences.

Things to add:

- Clean a little bit more the code, splitting some files.
- Adding success message to the CreateExerciseForm
- Improving responsive design glitches
- Add a container with max-width for larger


**About the framework**:

Below some guide items to set the server and the tests running

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=18.0.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.


## Testing with Jest

To run all the tests:

```
yarn rw test
```

To run just backend tests:


```
yarn rw test api
```

Just front end tests:

```
yarn rw test web
```
