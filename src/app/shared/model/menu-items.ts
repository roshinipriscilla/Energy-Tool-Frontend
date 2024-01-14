export interface MenuItem {
  label: string;
  icon: string;
  url: string;
}
export interface sideMenuItem {
  label: string;
  icon: string;
  subMenu: boolean;
  url?: string;
  subMenuItems?: Array<subMenuItem>;

}

export interface subMenuItem {
  label: string;
  url?: string;

}

export const MenuItemList = [
  {
    label: 'Play Video',
    icon: 'slideshow',
    showOnMobile: false,
    showOnTablet: false,
    showOnDesktop: true,
    url: 'playVideo',

  },
  {
    label: 'Blog',
    icon: 'rss_feed',
    showOnMobile: false,
    showOnTablet: false,
    showOnDesktop: true,
    url: '',

  },
  {
    label: 'Docs',
    icon: 'notes',
    showOnMobile: false,
    showOnTablet: true,
    showOnDesktop: true,
    url: '',

  },
  {
    label: 'About',
    icon: 'help',
    showOnMobile: false,
    showOnTablet: true,
    showOnDesktop: true,
    url: '',

  },
  {
    label: 'Sign Out',
    icon: 'logout',
    showOnMobile: true,
    showOnTablet: true,
    showOnDesktop: true,
    url: '',

  }
];

export const sideMenuItem = [
  {
    label: 'Dashboard',
    icon: 'home',
    subMenu: false,
    url: 'dashboard',

  },
  {
    label: 'Students Record',
    icon: 'groups',
    subMenu: false,
    url: 'add-student',

  },
  {
    label: 'Reports V2',
    icon: 'directions_car',
    subMenu: false,
    url: 'profile',

  },
  {
    label: 'Non Completed Trips',
    icon: 'description',
    subMenu: false,
    url: 'help',

  },
  {
    label: 'Entities',
    icon: 'list',
    subMenu: true,
    // url: 'entities',
    subMenuItems: [{
      label: 'Airport Booking',
      url: 'AirportBookings',

    },
    {
      label: 'Booking',
      url: 'Booking',

    },
    {
      label: 'Bt Meter Trip Data',
      url: 'Booking'
    },
    {
      label: 'Call Details',
      url: 'Call-details'
    },
    {
      label: 'Car Current Status',
      url: 'Car-current-status'
    },
    {
      label: 'Cars Free In Zone',
      url: 'car-free-zone'
    },
    {
      label: 'Customer Balance',
      url: 'customer-balance'
    },
    {
      label: 'Customer Emergency Contacts',
      url: 'customer-emergency-contacts'
    },
    {
      label: 'Customer Favorite Place',
      url: 'customer-fav-place'
    },
    {
      label: 'Driver Attendance',
      url: 'driver-attendance'
    },
    {
      label: 'Driver Complaint Registers',
      url: 'driver-complaint-register'
    }
    ]
  },
  {
    label: 'Integrator',
    icon: 'list',
    subMenu: true,
    // url: 'integrator',
    subMenuItems: [
      {
        label: 'Auth',
        url: 'Auth',

      },
      {
        label: 'Booking',
        url: 'booking',

      }]
  }
];