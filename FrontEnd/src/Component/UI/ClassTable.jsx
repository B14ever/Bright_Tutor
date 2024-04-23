import React,{useState,useReducer} from 'react'
import {useGetClassesQuery,useEditClassMutation,useDeleteClassMutation} from '../../Features/Class/classApiSlice'
import { styled } from '@mui/material/styles';
import { Box, LinearProgress, Typography, Paper, Table, TableBody, TableCell,TableContainer, 
        TableHead,TablePagination,TableRow,IconButton,Tooltip,
        Dialog,DialogActions,DialogTitle,DialogContent,Button,Alert,Snackbar, FormHelperText, TextField
        } from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976D2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const ClassTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editDialog,setEditDialog] = useState(false)
    const [openSnakBar,setOpenSnakBar] = useState(false)
    const [resultError,setResultError] = useState('')
    const [edit,setEdit] = useState({})
    const [deleteDialog,setDeleteDialog] = useState(false)
    const [deleteID,setDeleteID] = useState('')
    const [errors, seterrors] = useState({Grade:false,Section:false})
    
    const {data:classes,isLoading} = useGetClassesQuery()
    const  [editClass] = useEditClassMutation()
    const [deleteClass] = useDeleteClassMutation()
    const openEditDialog = (row) => {
      seterrors({Grade:false,Section:false})
      setEdit(row)
      setEditDialog(true);
    };
    const openDeleteDialog  = (rowId) =>{
        setDeleteID(rowId)
        setDeleteDialog(true)
    }
    const handleClose = () => {
      setEditDialog(false) || setOpenSnakBar(false) || setDeleteDialog(false)
    }; 
    const handleChange = (e) => {
      const {name,value} = e.target
        if(!value){
          seterrors({...errors,[name]:true})
        }
        if(value){
          setEdit({...edit,[name]:value})
          seterrors({...errors,[name]:false})
        }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await editClass(edit).unwrap()
        location.reload();
      } catch (err) {
        setResultError(err.data)
        setOpenSnakBar(true)
      }
    }
    const handleDelete = async (e) => {
      e.preventDefault();
      try {
        await deleteClass(deleteID).unwrap()
        location.reload();
      } catch (err) {
        setResultError(err.data)
        setOpenSnakBar(true)
      }
    }
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const isDisabled = errors.Grade || errors.Section
  return (
        <Box>
            {
          isLoading ?
          <LinearProgress/>
           :
           <Paper sx={{ width: '80%', overflow: 'hidden' }}>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell >ክፍል</StyledTableCell>
                        <StyledTableCell >ንኡስ ክፍል</StyledTableCell>
                        <StyledTableCell >የተማሪዎች ብዛት</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classes.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell >{row.Grade}</StyledTableCell>
                          <StyledTableCell >{row.Section}</StyledTableCell>
                          <StyledTableCell >{row.NumberOfStudent}</StyledTableCell>
                          {
                            row.NumberOfStudent === 0 ? 
                            <StyledTableCell >
                               <Box sx={{display:'flex',gap:'1rem'}}>
                                 <Tooltip title='ማስተካከል' placement="top-start">
                                    <IconButton onClick={()=>openEditDialog(row)} aria-label="delete"  color="primary">
                                        <EditIcon />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title='መሰረዝ' placement="top-start"r>
                                  <IconButton onClick={()=>{openDeleteDialog(row._id)}} aria-label="delete"  color="error">
                                      <DeleteIcon />
                                  </IconButton>
                                 </Tooltip>
                               </Box>
                            </StyledTableCell>
                            :
                            null
                          }
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
           {/* <TablePagination
             rowsPerPageOptions={[4, 8, 16]}
             component="div"
             count={classes.length}
             rowsPerPage={rowsPerPage}
             page={page}
             onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
           /> */}
         </Paper>
           }
        <Dialog open={editDialog} onClose={handleClose}>
        <DialogTitle sx={{textAlign:'center'}}>አዲስ ክፍል መመዝገቢያ ቅጽ</DialogTitle>
        <Box component='form' onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ክፍል"
            fullWidth
            name='Grade'
            defaultValue={edit.Grade}
            onChange={handleChange}
          />
            <FormHelperText sx={{color:'red'}}>{errors.Grade?`ክፍል ያስፈልጋል`:''}</FormHelperText>
            <TextField
            autoFocus
            margin="dense"
            label="ንኡስ ክፍል"
            fullWidth
            name='Section'
            defaultValue={edit.Section}
            onChange={handleChange}
          />
          <FormHelperText sx={{color:'red'}}>{errors.Section?`ንኡስ ክፍል ያስፈልጋል`:''}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ተመለስ</Button>
          <Button type="submit" disabled={isDisabled} >መዝግብ</Button>
        </DialogActions>
        </Box>
        </Dialog>

        <Dialog open={deleteDialog} onClose={handleClose}>
        <DialogTitle sx={{textAlign:'center'}}>ክፍሉን ለመስረዝ እርግጠኛ ኖት</DialogTitle>
        <Box component='form' onSubmit={handleDelete}>
        <DialogActions>
          <Button onClick={handleClose}>ተመለስ</Button>
          <Button type="submit" variant='contained' color='error' disabled={isDisabled} >ሰርዝ</Button>
        </DialogActions>
        </Box>
        </Dialog>
        <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'center'}} open={openSnakBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="warning" onClose={handleClose}  sx={{ width: '100%' }}>
             {resultError}
           </Alert>
         </Snackbar>
        </Box>
  )
}

export default ClassTable