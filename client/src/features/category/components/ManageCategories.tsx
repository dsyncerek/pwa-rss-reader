import React, { FC, FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectAsyncStatus } from '../../../core/async/async.selectors';
import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from '../category.actions';
import { selectAllCategories } from '../category.selectors';
import { CategoryTable } from './CategoryTable';
import { SaveCategoryModal } from './SaveCategoryModal';
import { Category, SaveCategory } from '../models/Category';

export const ManageCategories: FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const defaultCategory: SaveCategory = { name: '' };
  const [fetching] = useSelector(state => selectAsyncStatus(state, [fetchAllCategories]));
  const [saving, saveError] = useSelector(state => selectAsyncStatus(state, [createCategory, updateCategory]));
  const [removing] = useSelector(state => selectAsyncStatus(state, [deleteCategory]));
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<SaveCategory>(defaultCategory);

  useEffect(() => {
    if (!saving && !saveError) {
      closeModal();
    }
  }, [saving, saveError]);

  const changeInput = (event: any) => {
    const { name, value } = event.target;
    setSelected({ ...selected, [name]: value });
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    if (selected.id) {
      dispatch(updateCategory({ category: selected }));
    } else {
      dispatch(createCategory({ category: selected }));
    }
  };

  const performDelete = (category: Category) => {
    setSelected(category);
    dispatch(deleteCategory({ id: category.id }));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openCreateModal = () => {
    setSelected(defaultCategory);
    setModalVisible(true);
  };

  const openUpdateModal = (category: Category) => {
    setSelected(category);
    setModalVisible(true);
  };

  return (
    <div className="mb-n3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Categories</h2>
        <Button onClick={openCreateModal}>
          <span className="fas fa-plus" aria-label="Add" />
        </Button>
      </div>

      <CategoryTable
        categories={categories}
        loading={fetching}
        removing={removing}
        selectedId={selected?.id}
        onDelete={performDelete}
        onUpdate={openUpdateModal}
      />

      <SaveCategoryModal
        category={selected}
        saving={saving}
        error={saveError?.message}
        isVisible={modalVisible}
        onClose={closeModal}
        onChange={changeInput}
        onSubmit={submitForm}
      />
    </div>
  );
};
