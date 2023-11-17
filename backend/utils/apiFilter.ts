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
    const removeFields = ['location']
    removeFields.forEach(el => delete queryStrCopy[el])
    // exec MongoDB find()
    this.query = this.query.find(queryStrCopy)

    return this
  }
}

export default APIFilter
