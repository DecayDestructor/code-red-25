import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Common = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            Loading
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  )
}
export default Common
