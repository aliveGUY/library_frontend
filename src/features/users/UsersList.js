import { useGetAuthorsQuery } from "./usersApiSlice"

console.log("хуй")
const UsersList = () => {
    const {
        data: authors,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetAuthorsQuery()
      let content = ''

      if (isLoading) {
        content = <p>Loading...</p>
      }
    
      if (isError) {
        content = (
          <div>
            <p>Error</p>
            <p>{error}</p>
          </div>
        )
      }
    
      if (isSuccess) {
        console.log(authors)
        content = (
          <div>
            success
          </div>
        )
      }
    
      return content
}

export default UsersList
