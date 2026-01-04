import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { NewProfileForm, User } from './types';
import NewProfileFormComponent from './NewProfileForm';
import NewProfileTable from './NewProfileTable';

export default function NewProfile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProfileForm>();

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });
  const [showTable, setShowTable] = useState(users.length > 0);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLang, setNewLang] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    setShowTable(users.length > 0);
  }, [users]);

  const onSubmit = (data: NewProfileForm) => {
    setLoading(true);
    const newUser: User = { ...data, languages, id: Date.now() };
    setTimeout(() => {
      setUsers((prev) => [...prev, newUser]);
      reset();
      setLanguages([]);
      setNewLang('');
      setLoading(false);
      toast.success('המשתמש נוסף בהצלחה');
    }, 1000);
  };

  const handleUpdateSubmit = (data: NewProfileForm) => {
    if (editingUserId === null) return;
    setLoading(true);
    const updatedUser: User = { ...data, languages, id: editingUserId };
    setTimeout(() => {
      setUsers((prev) => prev.map((user) => (user.id === editingUserId ? updatedUser : user)));
      reset();
      setLanguages([]);
      setNewLang('');
      setEditingUserId(null);
      setIsEditing(false);
      setLoading(false);
      toast.info('המשתמש עודכן בהצלחה');
    }, 1000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש הזה?')) {
      const updated = users.filter((user) => user.id !== id);
      setUsers(updated);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל המשתמשים?')) {
      setUsers([]);
    }
  };

  const handleEdit = (user: User) => {
    reset(user);
    setLanguages(user.languages || []);
    setIsEditing(true);
    setEditingUserId(user.id);
  };

  const handleAddLanguage = () => {
    const lang = newLang.trim();
    if (lang && !languages.includes(lang)) {
      setLanguages((prev) => [...prev, lang]);
      setNewLang('');
    }
  };

  const removeLanguage = (index: number) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    reset();
    setLanguages([]);
    setNewLang('');
    setIsEditing(false);
    setEditingUserId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 p-6">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" limit={1} />
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">יצירת פרופיל משתמש חדש</h1>
      <NewProfileFormComponent
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={isEditing ? handleUpdateSubmit : onSubmit}
        isEditing={isEditing}
        loading={loading}
        languages={languages}
        newLang={newLang}
        setNewLang={setNewLang}
        onAddLanguage={handleAddLanguage}
        onRemoveLanguage={removeLanguage}
        onReset={handleReset}
      />
      {showTable && users.length > 0 && (
        <NewProfileTable users={users} onEdit={handleEdit} onDelete={handleDelete} onDeleteAll={handleDeleteAll} />
      )}
    </div>
  );
}
