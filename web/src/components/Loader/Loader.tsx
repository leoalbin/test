import ContentLoader from 'react-content-loader'

import Card from '../Card/Card'

const Loader = () => {
  return (
    <Card>
      <div className="p-8">
        <ContentLoader
          // speed={speed}
          width={'100%'}
          height={'100%'}
          backgroundColor={'#334155'}
          foregroundColor={'#42546e'}
        >
          <rect x="0" y="0" rx="8" ry="8" width="300" height="12" />
          <rect x="0" y="20" rx="8" ry="8" width="120" height="12" />
          <rect x="0" y="40" rx="8" ry="8" width="180" height="12" />

          <rect x="0" y="130" rx="8" ry="8" width="180" height="12" />
        </ContentLoader>
      </div>
    </Card>
  )
}

export default Loader
