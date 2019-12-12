import React, { FC } from 'react';
import { Alert, Button, ButtonToolbar, Table } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { Category } from '../../../models/Category';

type CategoryTableProps = {
  categories: Category[];
  loading?: boolean;
  removing?: boolean;
  selectedId?: string;
  error?: string;
  onUpdate: (category: Category) => void;
  onDelete: (category: Category) => void;
};

const CategoryTable: FC<CategoryTableProps> = ({
  categories,
  loading,
  removing,
  selectedId,
  error,
  onUpdate,
  onDelete,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const isRemovingCurrentRow = (id: string): boolean => {
    return !!removing && selectedId === id;
  };

  return (
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
                <Button size="sm" onClick={() => onUpdate(category)}>
                  <span className="fas fa-pen" aria-label="Edit" />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={isRemovingCurrentRow(category.id)}
                  onClick={() => onDelete(category)}
                >
                  {isRemovingCurrentRow(category.id) ? (
                    <span className="fas fa-spin fa-spinner" aria-label="Delete" />
                  ) : (
                    <span className="fas fa-trash" aria-label="Removing" />
                  )}
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
  );
};

export default CategoryTable;
