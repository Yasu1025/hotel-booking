class APIFilter {
  query: any
  queryStr: any

  constructor(query: any, queryStr: any) {
    this.query = query
    this.queryStr = queryStr
  }

  search(): APIFilter {
    const location = this.queryStr?.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i',
          },
        }
      : {}

    // exec MongoDB find()
    this.query = this.query.find({ ...location })
    return this
  }

  filter(): APIFilter {
    const queryStrCopy = { ...this.queryStr }
    // Delete 'Location', 'page' field for filtering since it's Search condition
    const removeFields = ['location', 'page']
    removeFields.forEach(el => delete queryStrCopy[el])
    // exec MongoDB find()
    this.query = this.query.find(queryStrCopy)

    return this
  }

  pagination(resPerPage: number): APIFilter {
    const currentPage = Number(this.queryStr?.page) || 1
    const skip = resPerPage * (currentPage - 1)

    this.query = this.query.clone().limit(resPerPage).skip(skip)

    return this
  }
}

export default APIFilter
