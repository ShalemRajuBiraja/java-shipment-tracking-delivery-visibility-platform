<!-- FRONT-END PROJECT STRACTURE -->
shiptrack-pro-frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/   → images/icons
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/ → reusable furniture
│   │   ├── common/
│   │   └── layout/
│   │
│   ├── pages/ → rooms
│   │   ├── auth/
│   │   ├── customer/
│   │   ├── business/
│   │   ├── operator/
│   │   ├── support/
│   │   └── admin/
│   │
│   ├── services/ → communication with backend
│   │
│   ├── context/ → shared information
│   │
│   ├── hooks/ → reusable React logic
│   │
│   ├── utils/ → helper functions
│   │
│   ├── App.jsx  → main application
│   ├── main.jsx → application starting point
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── vite.config.js