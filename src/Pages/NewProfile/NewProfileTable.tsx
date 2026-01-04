import { User } from './types';

interface NewProfileTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
}

export default function NewProfileTable({ users, onEdit, onDelete, onDeleteAll }: NewProfileTableProps) {
  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white">רשימת משתמשים</h2>
        <button onClick={onDeleteAll} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
          מחיקת כל המשתמשים
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-right border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              <th className="p-2">שם פרטי</th>
              <th className="p-2">שם משפחה</th>
              <th className="p-2">טלפון</th>
              <th className="p-2">אימייל</th>
              <th className="p-2">עיר</th>
              <th className="p-2">סוג</th>
              <th className="p-2">שפות</th>
              <th className="p-2">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-600 border-t text-sm">
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.city}</td>
                <td className="p-2">{user.userType}</td>
                <td className="p-2">{user.languages?.join(', ')}</td>
                <td className="p-2 space-x-2 rtl:space-x-reverse">
                  <button onClick={() => onEdit(user)} className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded">
                    עריכה
                  </button>
                  <button onClick={() => onDelete(user.id)} className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded">
                    מחיקה
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
