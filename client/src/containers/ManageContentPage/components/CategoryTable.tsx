import React, { FC } from 'react';
import { Alert, Button, ButtonToolbar, Table } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { Category } from '../../../models/Category';

type CategoryTableProps = {
  categories: Category[];
  loading?: boolean;
  error?: string;
  onUpdate: (category: Category) => void;
  onDelete: (category: Category) => void;
};

const CategoryTable: FC<CategoryTableProps> = ({ categories, loading, error, onUpdate, onDelete }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

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
                <Button size="sm" variant="danger" onClick={() => onDelete(category)}>
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
  );
};

export default CategoryTable;
