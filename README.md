# UserAccessApp
פרויקט מסכם – מודול React

אפליקציית React Single Page Application (SPA) לניהול תוכן מסוג כרטיסי ביקור, הכוללת מערכת התחברות והרשאות, ניהול כרטיסים למשתמשים עסקיים, מערכת מועדפים, עמוד פרטי עסק עם מפה, ו־מערכת CRM למשתמש מנהל.

הפרויקט פותח כחלק מהפרויקט המסכם של מודול React, ומשלב קריאות HTTP לשרת REST API חיצוני.

## תיאור כללי

UserAccessApp היא אפליקציית Web בצד לקוח (Client Side) המדגימה עבודה עם React תוך:

ניתוב בין דפים (React Router)

ניהול state גלובלי

עבודה עם טפסים וולידציה

קריאות HTTP ל־API

הרשאות משתמשים

עיצוב רספונסיבי ונגיש

התוכן (כרטיסי הביקור, משתמשים, מועדפים) נשמר ומנוהל בצד השרת באמצעות REST API.

## תכונות עיקריות

### מערכת משתמשים והרשאות

התחברות משתמשים באמצעות JWT

שמירת token ב־localStorage (ללא שמירת מידע רגיש)

שלושה סוגי משתמשים:

Regular User

Business User

Admin

### ניהול כרטיסי ביקור (CRUD)

הצגת כרטיסי ביקור בעמוד הבית

יצירת כרטיס חדש (Business בלבד)

עריכת כרטיס קיים

מחיקת כרטיס

דף "My Cards" להצגת כרטיסי המשתמש

### מועדפים

סימון כרטיסים כמועדפים

שמירה בצד השרת

דף ייעודי להצגת מועדפים

הסרה ממועדפים

### דפי מערכת

Home – עמוד ראשי עם כרטיסים וחיפוש

Business Details – עמוד פרטי עסק עם מפה

Sign In – התחברות

Profile – עריכת פרטי משתמש

Favorites – כרטיסים מועדפים

My Cards – ניהול כרטיסים אישיים

CRM – ניהול משתמשים (Admin בלבד)

About – דף אודות והסבר על המערכת

## טכנולוגיות צד לקוח

React 18

TypeScript

Vite

React Router

Redux Toolkit

Axios – קריאות HTTP

React Hook Form – ניהול טפסים

Joi – ולידציות

Tailwind CSS – עיצוב רספונסיבי

React Icons

React Toastify

## עיצוב ורספונסיביות

עיצוב מלא באמצעות CSS (Tailwind)

התאמה למובייל, טאבלט ודסקטופ

תמיכה ב־Light Mode / Dark Mode

תפריט ניווט דינמי לפי הרשאות

Footer דינמי לפי סוג משתמש

שימוש באייקונים לפעולות CRUD

## נגישות

שם האפליקציה מוגדר ב־<title>

favicon מוגדר

לכל תמונה קיים alt

הודעות שגיאה והצלחה מוצגות למשתמש

## ולידציות וטפסים

אחידות עיצוב לכל הטפסים

ולידציה לכל שדה חובה

חיווי ויזואלי לשגיאות

שליחה מתאפשרת רק לאחר ולידציה תקינה

סיסמה נדרשת:

לפחות 8 תווים

אות גדולה

אות קטנה

לפחות 4 ספרות

תו מיוחד מתוך: !@%$#^&*-_*

## קריאות HTTP (API)

המערכת משתמשת ב־REST API חיצוני.

Base URL:

https://monkfish-app-z9uza.ondigitalocean.app/bcard2

### Authentication

POST /users/login – התחברות (JWT)

### Cards

GET /cards

GET /cards/:id

POST /cards

PUT /cards/:id

PATCH /cards/:id – מועדפים

### Users (Admin)

GET /users

PATCH /users/:id

DELETE /users/:id

### Headers לבקשות מוגנות:

x-auth-token: <JWT_TOKEN>

## מבנה הפרויקט

UserAccessApp/
├── src/
│   ├── API/              # קריאות API
│   ├── Components/       # קומפוננטות משותפות
│   ├── Pages/            # דפי האפליקציה
│   ├── store/            # Redux store
│   ├── validations/      # סכמות ולידציה
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── README.md

## התקנה והרצה (Clean Clone)

git clone <repository-url>
cd UserAccessApp
npm install

### הרצה בפיתוח

npm run dev


האפליקציה תרוץ על:
http://localhost:5173

### בניית Production

npm run build

### Preview מקומי

npm run preview

### Deployment (Vercel)

Framework: Vite

Build Command: npm run build

Output Directory: dist

Node Version: 18+

## הערות חשובות להגשה

הפרויקט מועלה ל־Git ללא:

node_modules

dist

.env

קוד נקי, ללא console.log

קבצים מחולקים (אין קובץ מעל 200 שורות)

תוכן אמיתי (לא Lorem Ipsum)

## מחבר

מיכאל פפיסמדוב
פרויקט מסכם – מודול React
