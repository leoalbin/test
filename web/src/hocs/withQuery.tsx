import React from 'react'

import { useQuery } from '@apollo/client'

// Define the HOC
function withQuery(
  query,
  LoadingComponent,
  EmptyComponent,
  ErrorComponent,
  SuccessComponent
) {
  return function WithQueryHOC(props) {
    const { loading, error, data } = useQuery(query)

    if (loading) {
      return <LoadingComponent />
    }

    if (error) {
      return <ErrorComponent error={error} />
    }

    if (!data || Object.keys(data).length === 0) {
      return <EmptyComponent />
    }

    return <SuccessComponent data={data} {...props} />
  }
}

export default withQuery
