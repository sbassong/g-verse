import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";


const menuTheme = createTheme({
  palette: {
    background: {
      default: "#1b1b1b"
    }
  }
});

const AccountMenu = ({user, handleLogOut}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HomeItem = () => <span className='menu-item subtext bold'>Home</span>
  const LibraryItem = () => <span className='menu-item subtext bold'>Library</span>
  const ProfileItem = () => <span className="menu-item subtext">Account</span>
  const LogInItem = () => <span className='menu-item subtext'>Sign in</span>
  const LogOutItem = () => <span className='menu-item subtext'>Sign out</span>

  return (
    <React.Fragment>
      <AiOutlineUser 
        className='menu-item title login-icon no-display-max'
        onClick={handleClick}
      />

      <GiHamburgerMenu 
        className='menu-item title menu-icon no-display'
        onClick={handleClick}
      />

      <ThemeProvider theme={menuTheme}>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1,
              '& .MuiSvgIcon-root': {
                width: 25,
                height: 25,
                ml: -0.5,
                bgcolor: 'background.default',
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 8,
                width: 10,
                height: 10,
                bgcolor: 'background.default',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <NavLink to='/'>
            <MenuItem className='no-display'  onClick={handleClose}>
              <HomeOutlinedIcon />
              <HomeItem />
            </MenuItem>
          </NavLink>
          <NavLink to='/library/games'>
            <MenuItem className='no-display' onClick={handleClose}>
              <VideoLibraryOutlinedIcon />
              <LibraryItem />
            </MenuItem>
          </NavLink>

          <Divider className='no-display'/>

          { user &&
            <NavLink to="/user/account">
              <MenuItem onClick={handleClose}>
                <AccountCircleOutlinedIcon />
                <ProfileItem />
              </MenuItem>
            </NavLink>
          }  
          { user &&
            <NavLink to="/" onClick={handleLogOut} >
              <MenuItem onClick={handleClose}>
                <Logout />
                <LogOutItem />
              </MenuItem>
            </NavLink>
          }
          { !user &&
            <NavLink to="/signin">
              <MenuItem onClick={handleClose}>
                <Login />
                <LogInItem />
              </MenuItem>
            </NavLink>
          }
        </Menu>
        
      </ThemeProvider>
    </React.Fragment>
  );
}

export default AccountMenu;