# UserAccessApp

אפליקציית React + TypeScript + Vite לניהול גישות משתמשים וכרטיסי עסק.

## תיאור הפרויקט

UserAccessApp היא אפליקציית Single Page Application (SPA) שנבנתה במסגרת קורס Full Stack Development. האפליקציה מאפשרת ניהול משתמשים עם הרשאות שונות (אישי, עסקי, מנהל), ניהול כרטיסי עסק, מערכת מועדפים, ועוד.

### תכונות עיקריות

- **מערכת משתמשים**: התחברות והרשמה עם JWT authentication
- **כרטיסי עסק**: יצירה, עריכה, מחיקה והצגה של כרטיסי עסק
- **מועדפים**: שמירת כרטיסים כמועדפים (server-side)
- **הרשאות**: שלושה סוגי משתמשים (regular, business, admin)
- **CRM**: ניהול משתמשים למנהלים
- **עיצוב responsive**: Tailwind CSS עם תמיכה ב-dark mode

## טכנולוגיות

- **React 18** - ספריית UI
- **TypeScript** - שפה מוטיפוסית
- **Vite** - Build tool ו-development server
- **Redux Toolkit** - ניהול state גלובלי
- **React Router** - ניתוב בין דפים
- **Tailwind CSS** - עיצוב responsive
- **React Hook Form** - ניהול טפסים
- **Joi** - ולידציה
- **Axios** - בקשות HTTP
- **React Toastify** - הודעות
- **JWT Decode** - פענוח tokens

## דרישות מערכת

- Node.js (גרסה 16 ומעלה)
- npm או yarn

## התקנה והרצה

### התקנה (Clean Clone)

```bash
# שכפול הפרויקט
git clone <repository-url>
cd UserAccessApp

# התקנת תלויות
npm install
```

**חשוב**: הפרויקט צריך להיות משוכפל לתיקייה ריקה. התיקייה הראשית היא `UserAccessApp/`.

### הרצה במצב פיתוח

```bash
npm run dev
```

האפליקציה תרוץ על `http://localhost:5173`

### בניית גרסת production

```bash
npm run build
```

הקבצים ייבנו לתיקייה `dist/`

### הרצת גרסת production מקומית

```bash
npm run preview
```

## משתני סביבה

הפרויקט משתמש ב-API חיצוני. אין צורך במשתני סביבה כרגע, אך ניתן להוסיף קובץ `.env` עם המשתנים הבאים:

```
VITE_API_BASE_URL=https://monkfish-app-z9uza.ondigitalocean.app/bcard2
```

**הערה**: קובץ `.env` לא נכלל ב-repository (ראה `.gitignore`). יש ליצור `.env.example` אם נדרש.

## Roles והרשאות

### Regular User (משתמש רגיל)
- צפייה בכרטיסי עסק
- שמירת מועדפים
- עריכת פרופיל אישי

### Business User (משתמש עסקי)
- כל הרשאות של Regular User
- יצירה, עריכה ומחיקה של כרטיסי עסק שלו
- גישה לעמוד "My Cards"

### Admin User (מנהל)
- כל הרשאות של Business User
- גישה לעמוד CRM
- ניהול משתמשים (שינוי סטטוס, מחיקה)
- לא ניתן למחוק משתמשים מנהליים

## מבנה הפרויקט

```
UserAccessApp/
├── src/
│   ├── API/              # פונקציות API
│   ├── Components/       # קומפוננטות משותפות
│   ├── Pages/            # דפי האפליקציה
│   ├── store/            # Redux store
│   ├── validations/      # סכמות ולידציה
│   ├── App.tsx           # קומפוננטת השורש
│   └── main.tsx          # נקודת הכניסה
├── public/               # קבצים סטטיים
├── index.html            # קובץ HTML ראשי
├── package.json
└── README.md
```

## API Endpoints

האפליקציה מתחברת לשרת REST API:

**Base URL**: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2`

### Authentication
- `POST /users/login` - התחברות (מחזיר JWT token)
  - Body: `{ email: string, password: string }`
  - Response: JWT token (string)

### Cards
- `GET /cards` - קבלת כל הכרטיסים
- `GET /cards/:id` - קבלת כרטיס ספציפי
- `POST /cards` - יצירת כרטיס חדש (נדרש `x-auth-token` header)
- `PUT /cards/:id` - עדכון כרטיס (נדרש `x-auth-token` header)
- `PATCH /cards/:id` - עדכון מועדף (נדרש `x-auth-token` header)

### Users (Admin Only)
- `GET /users` - קבלת רשימת משתמשים (נדרש `x-auth-token` header)
- `PATCH /users/:id` - עדכון סטטוס משתמש (נדרש `x-auth-token` header)
- `DELETE /users/:id` - מחיקת משתמש (נדרש `x-auth-token` header)

**Headers נדרשים לבקשות מוגנות**: `x-auth-token: <JWT_TOKEN>`

## פיתוח

### סקריפטים זמינים

- `npm run dev` - הרצת development server
- `npm run build` - בניית production
- `npm run preview` - הרצת preview של build
- `npm run lint` - בדיקת ESLint
- `npm run lint:fix` - תיקון אוטומטי של ESLint
- `npm run format` - עיצוב קוד עם Prettier
- `npm run typecheck` - בדיקת TypeScript (ללא build)

## Deployment ל-Vercel

### הגדרות Vercel

1. **Framework Preset**: Vite
2. **Root Directory**: `UserAccessApp` (אם הפרויקט בתיקייה)
3. **Install Command**: `npm install`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Node Version**: 18.x (או גבוה יותר)

### שלבים

1. התחבר ל-Vercel
2. Import project מה-Git repository
3. Vercel יזהה אוטומטית שזה פרויקט Vite
4. וודא שההגדרות:
   - Root Directory: `UserAccessApp` (אם נדרש)
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. לחץ Deploy

**הערה**: אם הפרויקט ברמת השורש של ה-repository, השאר Root Directory ריק.

## בעיות נפוצות

### Build נכשל
- וודא ש-Node.js גרסה 16+ מותקן
- מחק `node_modules` ו-`package-lock.json` והרץ `npm install` מחדש
- וודא שאין שגיאות TypeScript: `npm run typecheck`

### API לא מגיב
- וודא שה-API server פעיל
- בדוק את ה-network tab בדפדפן
- וודא שה-token תקף (אם נדרש)

### Routing לא עובד
- וודא שהשרת מוגדר ל-SPA mode (Vercel עושה זאת אוטומטית)
- בדוק את ה-`base` ב-`vite.config.ts`

## רישיון

פרויקט זה נבנה במסגרת קורס לימודי.

## מחבר

מיכאל פפיסמדוב
