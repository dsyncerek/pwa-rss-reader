import React, { FC, FormEvent, useState } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { Category, SaveCategory } from '../../../models/Category';
import { HttpError } from '../../../models/HttpError';
import SaveCategoryModal from './SaveCategoryModal';

type CategoryTableProps = {
  categories: Category[];
  loading: boolean;
  error?: HttpError;
  onCreate: (category: SaveCategory) => void;
  onUpdate: (category: SaveCategory) => void;
  onDelete: (id: string) => void;
};

const CategoryTable: FC<CategoryTableProps> = ({ categories, loading, onCreate, onUpdate, onDelete }) => {
  const defaultCategory: SaveCategory = { name: '' };

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [editedCategory, setEditedCategory] = useState<SaveCategory>(defaultCategory);

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setEditedCategory({ ...editedCategory, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (editedCategory.id) {
      onUpdate(editedCategory);
    } else {
      onCreate(editedCategory);
    }

    setCategoryModalVisible(false);
  };

  const onModalClose = () => {
    setCategoryModalVisible(false);
  };

  const onCreateClick = () => {
    setEditedCategory(defaultCategory);
    setCategoryModalVisible(true);
  };

  const onUpdateClick = (category: Category) => {
    setEditedCategory(category);
    setCategoryModalVisible(true);
  };

  const onDeleteClick = (id: string) => {
    onDelete(id);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>Categories</h2>
        <Button onClick={onCreateClick}>
          <span className="fas fa-plus" aria-label="Add" />
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <ButtonToolbar>
                    <Button size="sm" onClick={() => onUpdateClick(category)}>
                      <span className="fas fa-pen" aria-label="Edit" />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDeleteClick(category.id)}>
                      <span className="fas fa-trash" aria-label="Delete" />
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
            {!categories.length && (
              <tr>
                <td colSpan={2}>No results.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <SaveCategoryModal
        category={editedCategory}
        isVisible={categoryModalVisible}
        onClose={onModalClose}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default CategoryTable;
