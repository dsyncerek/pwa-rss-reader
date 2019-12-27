import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Table from 'react-bootstrap/Table';
import { Category } from '../../models/Category';
import Loader from '../Loader';

type CategoryTableProps = {
  categories: Category[];
  loading?: boolean;
  removing?: boolean;
  selectedId?: string;
  onUpdate: (category: Category) => void;
  onDelete: (category: Category) => void;
};

const CategoryTable: FC<CategoryTableProps> = ({ categories, loading, removing, selectedId, onUpdate, onDelete }) => {
  const isRemovingCurrentRow = (id: string): boolean => {
    return !!removing && selectedId === id;
  };

  return (
    <Table responsive bordered>
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
            <td className="text-nowrap">
              <ButtonToolbar>
                <Button size="sm" onClick={() => onUpdate(category)}>
                  <span className="fas fa-fw fa-pen" aria-label="Edit" />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={isRemovingCurrentRow(category.id)}
                  onClick={() => onDelete(category)}
                >
                  {isRemovingCurrentRow(category.id) ? (
                    <span className="fas fa-fw fa-spin fa-spinner" aria-label="Delete" />
                  ) : (
                    <span className="fas fa-fw fa-trash" aria-label="Removing" />
                  )}
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
        ))}
        {loading && (
          <tr>
            <td colSpan={2} className="p-0">
              <Loader />
            </td>
          </tr>
        )}
        {!categories.length && !loading && (
          <tr>
            <td colSpan={2}>No results.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
