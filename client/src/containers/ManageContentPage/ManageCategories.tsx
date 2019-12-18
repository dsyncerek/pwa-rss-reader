import React, { FC, FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect, ConnectedProps } from 'react-redux';
import { createCategory, deleteCategory, updateCategory } from '../../actions/categoryActions';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import { Category, SaveCategory } from '../../models/Category';
import { RootState } from '../../reducers';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import { categoriesSelector } from '../../selectors/categorySelectors';
import CategoryTable from './components/CategoryTable';
import SaveCategoryModal from './components/SaveCategoryModal';

const mapState = (state: RootState) => ({
  categories: categoriesSelector(state),
  fetching: loadingSelector(state, [CategoryActionTypes.FETCH_ALL_CATEGORIES]),
  saving: loadingSelector(state, [CategoryActionTypes.CREATE_CATEGORY, CategoryActionTypes.UPDATE_CATEGORY]),
  removing: loadingSelector(state, [CategoryActionTypes.DELETE_CATEGORY]),
  fetchError: errorSelector(state, [CategoryActionTypes.FETCH_ALL_CATEGORIES]),
  saveError: errorSelector(state, [CategoryActionTypes.CREATE_CATEGORY, CategoryActionTypes.UPDATE_CATEGORY]),
});

const mapDispatch = {
  createCategory,
  updateCategory,
  deleteCategory,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ManageCategoriesProps = PropsFromRedux;

const ManageCategories: FC<ManageCategoriesProps> = ({
  categories,
  fetching,
  saving,
  removing,
  fetchError,
  saveError,
  createCategory,
  updateCategory,
  deleteCategory,
}) => {
  const defaultCategory: SaveCategory = { name: '' };

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
      updateCategory(selected);
    } else {
      createCategory(selected);
    }
  };

  const performDelete = (category: Category) => {
    setSelected(category);
    deleteCategory(category.id);
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
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Categories</h2>

        {!fetching && !fetchError && (
          <Button onClick={openCreateModal}>
            <span className="fas fa-plus" aria-label="Add" />
          </Button>
        )}
      </div>

      <CategoryTable
        categories={categories}
        loading={fetching}
        removing={removing}
        selectedId={selected?.id}
        error={fetchError?.message}
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
    </>
  );
};

export default connector(ManageCategories);
