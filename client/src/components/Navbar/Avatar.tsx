import React from 'react'
import { ClickAwayListener, Button, Grow, Paper, Popper, MenuList, MenuItem as MenuItemMUI, Avatar as AvatarMui } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { MenuItem } from './Navbar';

export const Avatar = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((preVOpen) => !preVOpen);
  };

  const handleClose = (event: React.MouseEvent<Document | HTMLLIElement>) => {
    if (anchorRef.current && anchorRef?.current?.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <MenuItem>
      <Stack direction="row" spacing={2}>
        <div>
          <Button
            ref={anchorRef}
            onClick={handleToggle}
          >
            <AvatarMui src='' />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItemMUI onClick={handleClose}>Profile</MenuItemMUI>
                      <MenuItemMUI onClick={handleClose}>My account</MenuItemMUI>
                      <MenuItemMUI onClick={handleClose}>Logout</MenuItemMUI>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    </MenuItem>
  )
}
