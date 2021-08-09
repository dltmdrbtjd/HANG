import React from 'react';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Button } from '../../../elements';

const NotiBadge = () => {
  return (
    <Button _onClick={() => history.push('/noti')} shape="text">
      <Badge badgeContent={4} color="secondary">
        <NotificationsNoneIcon />
      </Badge>
    </Button>
  );
};

export default NotiBadge;
