import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import type { NewProfileForm } from './types';

interface NewProfileFormProps {
  register: UseFormRegister<NewProfileForm>;
  errors: FieldErrors<NewProfileForm>;
  handleSubmit: UseFormHandleSubmit<NewProfileForm>;
  onSubmit: (data: NewProfileForm) => void;
  isEditing: boolean;
  loading: boolean;
  languages: string[];
  newLang: string;
  setNewLang: (lang: string) => void;
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
  onReset: () => void;
}

export default function NewProfileForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isEditing,
  loading,
  languages,
  newLang,
  setNewLang,
  onAddLanguage,
  onRemoveLanguage,
  onReset,
}: NewProfileFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <div>
        <input
          {...register('firstName', { required: 'שדה חובה' })}
          placeholder="שם פרטי *"
          className={`input ${errors.firstName ? 'border-red-500' : ''}`}
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>
      <div>
        <input
          {...register('lastName', { required: 'שדה חובה' })}
          placeholder="שם משפחה *"
          className={`input ${errors.lastName ? 'border-red-500' : ''}`}
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>
      <input {...register('phone', { required: true })} placeholder="טלפון *" className="input" />
      <input {...register('email', { required: true })} placeholder="אימייל *" className="input" />
      <input {...register('location')} placeholder="מיקום" className="input" />
      <input {...register('street')} placeholder="רחוב" className="input" />
      <input {...register('city', { required: true })} placeholder="עיר *" className="input" />
      <select {...register('userType', { required: true })} className="input">
        <option value="">בחר סוג משתמש *</option>
        <option value="personal">אישי</option>
        <option value="business">עסקי</option>
        <option value="admin">מנהלי</option>
      </select>
      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">שפות</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLang}
            onChange={(e) => setNewLang(e.target.value)}
            className="input flex-1"
            placeholder="הוסף שפה"
          />
          <button type="button" onClick={onAddLanguage} className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600">
            הוסף
          </button>
        </div>
        {languages.length > 0 && (
          <p className="mt-2 text-sm dark:text-gray-300">
            שפות שנבחרו:
            {languages.map((lang, idx) => (
              <span key={idx} className="inline-block bg-blue-200 dark:bg-gray-700 px-2 py-1 m-1 rounded">
                {lang}
                <button onClick={() => onRemoveLanguage(idx)} className="ml-1 text-red-600">×</button>
              </span>
            ))}
          </p>
        )}
      </div>
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-between gap-4">
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold w-full">
          {loading ? 'טוען...' : isEditing ? 'עדכון משתמש' : 'אישור'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg font-semibold w-full"
        >
          ניקוי שדות
        </button>
        <button type="button" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold w-full">
          + הוסף משתמש שותף
        </button>
      </div>
    </form>
  );
}
