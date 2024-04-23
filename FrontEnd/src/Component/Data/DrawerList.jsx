import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
export const DraweList = [
    {
        id:1,
        Name:'አገልጋይ',
        Icon:<DashboardCustomizeOutlinedIcon color='primary'/>,
        Submenu:[
            {
                id:1,
                Name:'መዝጋቢ',
                Icon:<MapsUgcOutlinedIcon color='primary'/>,
                Path:'registror',
            },
            {
                id:2,
                Name:'የክፍል ተጠሪ',
                Icon:<EditNoteOutlinedIcon color='primary'/>,
                Path:'homeRoom',
            }
        ]
     },
     {
     id:2,
     Name:'ክፍላቶች',
     Icon:<DashboardCustomizeOutlinedIcon color='primary'/>,
     Path:'class',
   },
   {
    id:3,
    Name:'ኮርሶች',
    Icon:<DashboardCustomizeOutlinedIcon color='primary'/>,
    Path:'course',
  },
  {
    id:4,
    Name:'ተማሪ',
    Icon:<DashboardCustomizeOutlinedIcon color='primary'/>,
    Path:'student',
  }
]