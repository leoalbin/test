// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

import CreateExercisePage from './features/exercises/create/pages/CreateExercisePage/CreateExercisePage'
import ExercisesPage from './features/exercises/list/pages/ExercisesPage/ExercisesPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/exercises" page={ExercisesPage} name="exercises" />
      <Route path="/exercises/create" page={CreateExercisePage} name="createExercise" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
