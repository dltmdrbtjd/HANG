import React from 'react';
// material
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// elements
import { Link } from '../../../elements';

const NotiBadge = () => {
  return (
    <Link href="/noti">
      <Badge badgeContent={4} color="secondary">
        <NotificationsNoneIcon />
      </Badge>
    </Link>
  );
};

export default NotiBadge;
