import { AppBar, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'

import { Navbar } from '../../components/Navbar/Navbar'
import { FetchUser } from '../../types'
import { getAllUser } from '../../apiCalls'
import { userRequest } from '../../requestMethod'

const columns = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "username", label: "Username" },
  { id: "isAdmin", label: "Privilege" },
  { id: "isBanned", label: "isBanned" },
]

export const UserStatsPage = () => {
  const [users, setUsers] = useState<FetchUser[]>([])
  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await getAllUser()
      setUsers(fetchedUsers)
    }
    getUsers()
  }, [])
  const handleBanned = async (id:string) => {
    const bannedUser = await (await userRequest.put(`/users/banned/${id}`)).data as FetchUser
    const userIndex = users.findIndex(user=>user._id===id)
    const newUsers = [...users];
    newUsers[userIndex] = bannedUser
    setUsers(newUsers)
  }
  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar />
      </AppBar>
      <div className='table-container' style={{ paddingBottom: '60px', display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
        <div style={{ width: '1300px' }}>
          <TableContainer>
            <Table stickyHeader aria-label='stickey table'>
              <TableHead >
                <TableRow >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={'left'}
                      style={{ flex: 1 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  users.length !== 0 && users.map(user => {
                    return (
                      <TableRow hover key={user._id}>
                        {columns.map(column => {
                          let value = user[column.id as keyof FetchUser]
                          return (
                            <TableCell key={column.id}>
                              {
                                ['first_name', 'last_name', 'username'].includes(column.id) && <div>{value}</div>
                              }
                              {
                                column.id === 'isAdmin' && <div>{value ? 'Admin' : 'User'}</div>
                              }
                              {
                                (column.id === 'isBanned') &&
                                (
                                  user.isAdmin 
                                  ? <div>{value ? 'Banned' : 'Active'}</div>
                                  : <Button onClick={()=>handleBanned(user._id)} variant='contained' color='secondary'>{value ? 'Banned' : 'Active'}</Button>
                                )
                              }
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
