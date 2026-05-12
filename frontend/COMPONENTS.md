# Переиспользуемые компоненты Frontend

## Обзор

Frontend проекта Fitness Tracker полностью переработан для использования переиспользуемых компонентов. Это обеспечивает:

- Консистентность в дизайне и поведении
- Снижение дублирования кода
- Упрощение добавления новых функций
- Лучшую тестируемость

## Структура компонентов

### Base UI Components

#### `Button`

Универсальный компонент для кнопок.

```jsx
import { Button } from "@/components";

<Button
  variant="primary" // primary, secondary, danger
  size="md" // sm, md, lg
  onClick={handleClick}
  loading={isLoading}
>
  Click me
</Button>;
```

#### `Input`

Универсальный компонент для текстовых полей.

```jsx
import { Input } from "@/components";

<Input
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={handleChange}
  error="Error message"
  icon={<SomeIcon />}
/>;
```

#### `Select`

Компонент для выбора из списка.

```jsx
<Select
  value={selected}
  onChange={handleChange}
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
/>
```

### Modal Components

#### `Modal`

Базовый модальный компонент.

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  footer={<div>Footer content</div>}
>
  Content here
</Modal>
```

#### `ConfirmDialog`

Диалог подтверждения действия.

```jsx
<ConfirmDialog
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="Confirm"
  message="Are you sure?"
  isDangerous={true}
/>
```

### State Components

#### `LoadingState`

Состояние загрузки.

```jsx
<LoadingState message="Loading..." fullPage={false} />
```

#### `EmptyState`

Состояние пустого списка.

```jsx
<EmptyState
  message="No items found"
  icon={<SomeIcon />}
  action={<Button>Create</Button>}
/>
```

### Input Components

#### `SearchInput`

Поле поиска с иконкой.

```jsx
<SearchInput value={search} onChange={handleChange} placeholder="Search..." />
```

#### `SetInputForm`

Форма для добавления сета в сессию.

```jsx
<SetInputForm onAddSet={(weight, reps) => handleAddSet(weight, reps)} />
```

### Card Components

#### `ExerciseCard`

Карточка упражнения.

```jsx
<ExerciseCard
  exercise={exerciseData}
  onSelect={handleSelect}
  maxWeight={true}
/>
```

#### `SessionCard`

Карточка сессии тренировки.

```jsx
<SessionCard
  session={sessionData}
  onContinue={handleContinue}
  onEnd={handleEnd}
  isEnding={false}
/>
```

#### `CardList`

Список карточек с состояниями.

```jsx
<CardList isEmpty={true} emptyMessage="No items">
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</CardList>
```

### Selector Components

#### `MuscleGroupSelector`

Селектор мышечных групп.

```jsx
<MuscleGroupSelector
  muscleGroups={groupsArray}
  selectedId={selected}
  onSelect={handleSelect}
  showImages={true}
/>
```

#### `ExerciseSelector`

Компонент для выбора упражнений.

```jsx
<ExerciseSelector
  muscleGroups={groups}
  selectedMuscleGroup={selected}
  onMuscleGroupSelect={handleSelect}
  exercises={exercisesList}
  selectedExercises={selected}
  onExerciseToggle={handleToggle}
  isLoading={false}
/>
```

### Workout Components

#### `WorkoutCard`

Карточка тренировки с действиями.

```jsx
<WorkoutCard
  workout={workoutData}
  onStartSession={handleStart}
  onEdit={handleEdit}
  onDelete={handleDelete}
  showDeleteConfirm={false}
/>
```

#### `WorkoutFormModal`

Модальное окно для создания/редактирования тренировки.

```jsx
<WorkoutFormModal
  isOpen={isOpen}
  onClose={handleClose}
  title="Create Workout"
  workoutName={name}
  onWorkoutNameChange={setName}
  muscleGroups={groups}
  selectedMuscleGroup={selected}
  exercises={list}
  selectedExercises={selected}
  onExerciseToggle={handleToggle}
  onSubmit={handleSubmit}
/>
```

#### `WorkoutCarousel`

Карусель для навигации по тренировкам.

```jsx
<WorkoutCarousel
  workouts={workoutsList}
  currentIndex={index}
  onNext={handleNext}
  onPrev={handlePrev}
  onDotClick={handleDot}
/>
```

## Хуки (Hooks)

### `useModal`

Управление состоянием модального окна.

```jsx
import { useModal } from "@/hooks";

const modal = useModal(false);
modal.open();
modal.close();
modal.toggle();
```

### `useForm`

Управление состоянием формы.

```jsx
import { useForm } from "@/hooks";

const form = useForm({ name: "", email: "" });
form.values;
form.errors;
form.handleChange;
form.setFieldValue;
form.reset();
```

### `useAsync`

Работа с асинхронными операциями.

```jsx
import { useAsync } from "@/hooks";

const { data, loading, error, execute } = useAsync(fetchData, false);
```

## Примеры использования

### Страница с фильтрацией и поиском

```jsx
import { SearchInput, EmptyState, CardList } from "@/components";

export default function MyPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const filtered = useMemo(() => {
    return items.filter((item) => item.name.includes(search));
  }, [items, search]);

  return (
    <div>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <CardList isEmpty={filtered.length === 0} emptyMessage="No items found">
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </CardList>
    </div>
  );
}
```

### Форма в модальном окне

```jsx
import { Modal, Button, Input } from "@/components";
import { useModal, useForm } from "@/hooks";

export default function MyForm() {
  const modal = useModal();
  const form = useForm({ name: "" });

  const handleSubmit = async () => {
    if (!form.values.name) {
      form.setFieldError("name", "Required");
      return;
    }
    await submitForm(form.values);
    modal.close();
  };

  return (
    <>
      <Button onClick={modal.open}>Open Form</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Form">
        <Input
          value={form.values.name}
          onChange={form.handleChange}
          error={form.errors.name}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal>
    </>
  );
}
```

## Лучшие практики

1. **Импортируйте из index.jsx**: Используйте централизованный экспорт компонентов

   ```jsx
   import { Button, Input, Modal } from "@/components";
   ```

2. **Используйте пропсы для кастомизации**: Избегайте хардкода значений

   ```jsx
   <Button variant={isActive ? "primary" : "secondary"} />
   ```

3. **Комбинируйте компоненты**: Создавайте сложные UI из простых блоков

   ```jsx
   <Modal>
     <Input />
     <Select />
     <Button />
   </Modal>
   ```

4. **Используйте хуки для логики**: Отделяйте логику от представления

   ```jsx
   const modal = useModal();
   const form = useForm(initialValues);
   ```

5. **Пропагируйте события вверх**: Позволяйте родительским компонентам управлять состоянием

## Миграция старого кода

Если вы видите старый JSX код с хардкодированными стилями, замените его на переиспользуемые компоненты:

**До:**

```jsx
<button className="btn btn-primary">Click</button>
```

**После:**

```jsx
<Button>Click</Button>
```

**До:**

```jsx
<input type="text" className="input" />
```

**После:**

```jsx
<Input type="text" />
```

## Файловая структура

```
src/
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Select.jsx
│   ├── Modal.jsx
│   ├── ConfirmDialog.jsx
│   ├── LoadingState.jsx
│   ├── EmptyState.jsx
│   ├── SearchInput.jsx
│   ├── SetInputForm.jsx
│   ├── ExerciseCard.jsx
│   ├── SessionCard.jsx
│   ├── CardList.jsx
│   ├── MuscleGroupSelector.jsx
│   ├── ExerciseSelector.jsx
│   ├── WorkoutCard.jsx
│   ├── WorkoutFormModal.jsx
│   ├── WorkoutCarousel.jsx
│   ├── Navbar.jsx
│   └── index.jsx
├── hooks/
│   ├── useModal.js
│   ├── useForm.js
│   ├── useAsync.js
│   └── index.js
└── pages/
```

## Поддержка

Для вопросов или предложений по улучшению компонентов, пожалуйста, создайте issue в репозитории.
