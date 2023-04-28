# README

Welcome to Leo Albin's Test

**Video demos**:

[Video demo 1](https://www.loom.com/share/8eace1b4856b4ed880cc5005ee048c2d)

[Video demo 2](https://www.loom.com/share/46c275d0b6594f9a8708412b6875a6e5)


**Backend**:

I'm following Clean Architecture for the general architecture of the project. The main concept I'm applying here is to separate Domain, Application and Infrastructure layers by using dependency injection and inversion of control implementing Adapters against interfaces. We are using the design patterns Adapter, and Repository to isolate the application layer from the infrastructure layer. We implement the application layer use cases using interfaces of repositories. Then we instanciate the use cases classes injection the actual implementation of those interfaces. For example, we have IUserRepo interface, where we define all the methods we need to get and save User instances. Then we implement a concretion of that interface using Prisma ORM in PrismaUserRepo. The repositories return always an instance of a domain object, for doing that we implement mappers, with methods "toDomain" and "toPersistence". We could also add "toDTO" in some cases.

As part of this separation of concerns in layers, we have all the core code in the folder the folder "core" inside of /api/src/core.  This folder contains all the domain code, nothing related with infrastructure or framework except the repos implementations and the use case controllers. These implementation should be changed if the project needs to be migrated to a another framework.

We are applying the idea of not coupling to the framework, infrastructure or any implementation detail. the only thing is that the "core" folder is inside of api folder from redwood to avoid having to configure some building scripts, but I would move it to the root of the project.

For the code design and modelling I'm using DDD. The project was simple enought to use a MVC pattern with CRUD services, but I wanted to use DDD just to demostrate understanding on these desing patterns. I'm modelling the User and the Excercises as Aggregate Roots. Each of these Aggregates contains Objects Values like UserName or ExerciseContent.

The main idea I wanted to demonstrate here is the sense of collocating bussiness rules inside of the domain layer where it corresponds. So, for example, you could not create an ExerciseContent with a length bigger than 100 character. This is a bussiness rule, and the one in charge of validating this is the Value Object ExcerciseContent. The second business rule provided on the specs was that a User could not have more than ten excercises. I added 'excercises' as a property of the instance User, I'm modelling the user "having" excercises. Then I created a method in the User class to add exercises, and this method will validate if the user has reach the limit. Other option here, that would made the design simpler, was to move that rule to the application layer, get all the exercises, count how much have the same userId and prevent the creation of a new one, but it would be an anemic modelling.

The file structure is following DDD as well. Inside of "core" we have a shared folder with abstract classes that we use in all subdomains, and then the subdomains Exercises and Users. For the scope of the project would be fine to have only one subdomain, but if the project would be bigger, it seems like User and Excercises belong to different contexts. It's important to notice, that the file structure is not representing layers, we are collocating based on the use cases to simplify the code discoverability. You will find the controller (infra) and the use case (application) in the same folder, also the repos implementations are in the same folder as the interfaces.

The testing approach I'm taking is Acceptance testing in general. I'm writing test to the use cases following the pattern Given, When, Then. I know if the application logic is working, the domain logic is also working. But also added unit testing for the Exercise class to show a case of unit testing.

The error handling is also separated in layers, there a use case errors, domain errors are infrastructure errors. We are using a Result class to standarize domain error handling, and an Either monad to type the results of the use cases. For example if a instance of a ExerciseContent could not be created because the content is longer than 100 it will return a Result.fail() but it will not throw an error, it will be passed to the application layer where we are going handle that failed domain result and if there is nothing else to do we are going to return a Left use case result, then the controller is the one that will translate this left result into a throw or a graphQL error or a HTTP code. The controller masks the errors as well to not give a lot of details to the front-end for security concerns.

On the database modelling I crated the entities following the specs and set a relation 1-n, one User many Excercises setting the userId prop in Exercise as a foreign key to the User id. We have two separate tables to normalize the data, will make no sense to store the same user in each Exercise row. We are setting constrains in the id's of the User and the Exercise as primary keys.

Things I would like to add:
- Authentication and authorization to the controllers
- Pagination to the GetAllExercisesUseCase


**Front end**:

In the front-end we are using React and some extra libraries from Redwood.js to handle routes and forms (is wrapper to react-hook-forms).

The concepts I'm applying in the front-end are:

- Atomic design:
I'm implementing atoms for small indivisible parts of the desing, like Title, ScrollArea, Text, etc.

- Composition pattern:
For example, I created Sidebar component with a context, and building blocks, like "Sidebar.Root", "Sidebar.Link" etc.Here we are applying the Open Close principle, we could create different versions of the Sidebar without modifying existing/breaking instances.

- Feature collocation file structure
We organize the project around features to improve the discoverability of the code-base.

- Single responsibility
We try to make the components as smallers and simple as possible. We prefer tu use children composition than passing big amounts of properties to compose small building blocks into bigger structures.

- Higher Order Component
To reuse the logic of rendering different components when the fetching is different states (loading, success, error, empty) we created an HOC withQuery, that receives the Query and the different components as parameters.

- Testing
I made a basic testing to ensure any component throw an error, that covers 80% of the bugs related to a front-end compoenent without having to implement expensive tests against implementation details.

- Styling
- I'm using utlity first approach through Tailwind as it is a faster way to prototype design coding when you don't have a design system. It's also super efficient on laoding performance.

- Dark Mode
- We have used dark mode that is set automatically by the system preferences.

- State management
- We did a simple state managment implementation in the SidebarProvider and sharing the state using the react context pattern.

- Design
- We try to apply some UI designing concepts like: readability, color contrast, consistent padding and margin, consistent color palette, size text contrast, key points of attention using color (logo, button)

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

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.


## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```
