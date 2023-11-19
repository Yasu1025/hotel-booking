import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import Pagination from 'react-js-pagination'

interface IProps {
  resPerPage: number
  filteredRoomsTotal: number
}

export const CustomPagination = ({ resPerPage, filteredRoomsTotal }: IProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  let page = searchParams.get('page') || 1
  page = Number(page)

  let queryParams

  const handlePageChange = (currentPage: string) => {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)

      if (queryParams.has('page')) {
        queryParams.set('page', currentPage)
      } else {
        queryParams.append('page', currentPage)
      }

      const path = `${window.location.pathname}?${queryParams.toString()}`
      router.push(path)
    }
  }

  return (
    <div>
      {resPerPage < filteredRoomsTotal && (
        <div className='d-flex justify-content-center mt-5'>
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsTotal}
            onChange={handlePageChange}
            nextPageText={'>'}
            prevPageText={'<'}
            firstPageText={'<<'}
            lastPageText={'>>'}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      )}
    </div>
  )
}

export default CustomPagination
